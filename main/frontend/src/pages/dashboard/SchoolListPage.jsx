import { Helmet } from "react-helmet-async";
import { kebabCase } from "change-case";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Card,
  Table,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from "@mui/material";
import { useDispatch, useSelector } from "../../redux/store";
import { getSchools, deleteSchool } from "../../redux/slices/school";
import { PATH_DASHBOARD } from "../../routes/paths";
import { useSettingsContext } from "../../components/settings";
import { useTable, getComparator, emptyRows } from "../../components/table";
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "../../components/table";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import ConfirmDialog from "../../components/confirm-dialog";
import {
  SchoolTableRow,
  SchoolTableToolbar,
} from "../../sections/dashboard/school/list";

const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "address", label: "Address", align: "left" },
  { id: "schoolUid", label: "School UID", align: "left" },
  { id: "city", label: "City", align: "left" },
  { id: "state", label: "State", align: "left" },
  { id: "zip", label: "Zip", align: "left" },
  { id: "country", label: "Country", align: "left" },
  { id: "phoneNumber", label: "Phone Number", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "website", label: "Website", align: "left" },
  { id: "type", label: "Type", align: "left" },
  { id: "board", label: "Board", align: "left" },
  { id: "isActive", label: "Is Active", align: "left" },
  { id: "isVerified", label: "Is Verified", align: "left" },
  { id: "levels", label: "Levels", align: "left" },
  { id: "createdAt", label: "Created At", align: "left" },
  { id: "" },
];

const STATUS_OPTIONS = [
  { value: true, label: "Active" },
  { value: false, label: "Inactive" },
];

export default function SchoolListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: "createdAt" });
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schools, isLoading } = useSelector((state) => state.school);
  const [tableData, setTableData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(getSchools());
  }, [dispatch]);

  useEffect(() => {
    if (schools.length) {
      setTableData(schools);
    }
  }, [schools]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });
  const dataInPage = dataFiltered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const denseHeight = dense ? 60 : 80;
  const isFiltered = filterName !== "" || !!filterStatus.length;
  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!isLoading && !dataFiltered.length);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterStatus = (event) => {
    setPage(0);
    setFilterStatus(event.target.value);
  };

  const handleDeleteRow = (id) => {
    dispatch(deleteSchool(id));
    const deleteRow = tableData.filter((row) => row._id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows) => {
    dispatch(deleteSchool(selectedRows));
    const deleteRows = tableData.filter(
      (row) => !selectedRows.includes(row._id)
    );
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage =
          Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.school.edit(id));
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.school.view(id));
  };

  const handleResetFilter = () => {
    setFilterName("");
    setFilterStatus([]);
  };

  return (
    <>
      <Helmet>
        <title>School | SSE SMS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="School List"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "School", href: PATH_DASHBOARD.school.root },
            { name: "List" },
          ]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.school.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New School
            </Button>
          }
        />

        <Card>
          <SchoolTableToolbar
            filterName={filterName}
            filterStatus={filterStatus}
            onFilterName={handleFilterName}
            onFilterStatus={handleFilterStatus}
            statusOptions={STATUS_OPTIONS}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />
            <Scrollbar>
              <Table size={dense ? "small" : "medium"} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <SchoolTableRow
                          key={row._id}
                          row={row}
                          selected={selected.includes(row._id)}
                          onSelectRow={() => onSelectRow(row._id)}
                          onDeleteRow={() => handleDeleteRow(row._id)}
                          onEditRow={() => handleEditRow(row._id)}
                          onViewRow={() => handleViewRow(row._id)}
                        />
                      ) : (
                        !isNotFound && (
                          <TableSkeleton
                            key={index}
                            sx={{ height: denseHeight }}
                          />
                        )
                      )
                    )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong>{" "}
            items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filterName, filterStatus }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (product) =>
        product.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus.length) {
    inputData = inputData.filter((product) =>
      filterStatus.includes(product.inventoryType)
    );
  }

  return inputData;
}
