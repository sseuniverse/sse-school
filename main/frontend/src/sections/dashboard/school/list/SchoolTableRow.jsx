// import PropTypes from "prop-types";
// import { useState } from "react";
// import { sentenceCase } from "change-case";
// import {
//   Stack,
//   Button,
//   TableRow,
//   Checkbox,
//   MenuItem,
//   TableCell,
//   IconButton,
//   Link,
// } from "@mui/material";
// import { fDate } from "../../../../utils/formatTime";
// import { fCurrency } from "../../../../utils/formatNumber";
// import Label from "../../../../components/label";
// import Image from "../../../../components/image";
// import Iconify from "../../../../components/iconify";
// import MenuPopover from "../../../../components/menu-popover";
// import ConfirmDialog from "../../../../components/confirm-dialog";

// SchoolTableRow.propTypes = {
//   row: PropTypes.object,
//   selected: PropTypes.bool,
//   onEditRow: PropTypes.func,
//   onViewRow: PropTypes.func,
//   onSelectRow: PropTypes.func,
//   onDeleteRow: PropTypes.func,
// };

// export default function SchoolTableRow({
//   row,
//   selected,
//   onSelectRow,
//   onDeleteRow,
//   onEditRow,
//   onViewRow,
// }) {
//   const { name, cover, createdAt, inventoryType, price } = row;
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [openPopover, setOpenPopover] = useState(null);

//   const handleOpenConfirm = () => {
//     setOpenConfirm(true);
//   };

//   const handleCloseConfirm = () => {
//     setOpenConfirm(false);
//   };

//   const handleOpenPopover = (event) => {
//     setOpenPopover(event.currentTarget);
//   };

//   const handleClosePopover = () => {
//     setOpenPopover(null);
//   };

//   return (
//     <>
//       <TableRow hover selected={selected}>
//         <TableCell padding="checkbox">
//           <Checkbox checked={selected} onClick={onSelectRow} />
//         </TableCell>

//         <TableCell>
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <Image
//               disabledEffect
//               visibleByDefault
//               alt={name}
//               src={cover}
//               sx={{ borderRadius: 1.5, width: 48, height: 48 }}
//             />

//             <Link
//               noWrap
//               color="inherit"
//               variant="subtitle2"
//               onClick={onViewRow}
//               sx={{ cursor: "pointer" }}
//             >
//               {name}
//             </Link>
//           </Stack>
//         </TableCell>

//         <TableCell>{fDate(createdAt)}</TableCell>

//         <TableCell align="center">
//           <Label
//             variant="soft"
//             color={
//               (inventoryType === "out_of_stock" && "error") ||
//               (inventoryType === "low_stock" && "warning") ||
//               "success"
//             }
//             sx={{ textTransform: "capitalize" }}
//           >
//             {inventoryType ? sentenceCase(inventoryType) : ""}
//           </Label>
//         </TableCell>

//         <TableCell align="right">{fCurrency(price)}</TableCell>

//         <TableCell align="right">
//           <IconButton
//             color={openPopover ? "primary" : "default"}
//             onClick={handleOpenPopover}
//           >
//             <Iconify icon="eva:more-vertical-fill" />
//           </IconButton>
//         </TableCell>
//       </TableRow>

//       <MenuPopover
//         open={openPopover}
//         onClose={handleClosePopover}
//         arrow="right-top"
//         sx={{ width: 140 }}
//       >
//         <MenuItem
//           onClick={() => {
//             handleOpenConfirm();
//             handleClosePopover();
//           }}
//           sx={{ color: "error.main" }}
//         >
//           <Iconify icon="eva:trash-2-outline" />
//           Delete
//         </MenuItem>

//         <MenuItem
//           onClick={() => {
//             onEditRow();
//             handleClosePopover();
//           }}
//         >
//           <Iconify icon="eva:edit-fill" />
//           Edit
//         </MenuItem>
//       </MenuPopover>

//       <ConfirmDialog
//         open={openConfirm}
//         onClose={handleCloseConfirm}
//         title="Delete"
//         content="Are you sure want to delete?"
//         action={
//           <Button variant="contained" color="error" onClick={onDeleteRow}>
//             Delete
//           </Button>
//         }
//       />
//     </>
//   );
// }

import PropTypes from "prop-types";
import { useState } from "react";
import { sentenceCase } from "change-case";
import {
  Stack,
  Button,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  IconButton,
  Link,
} from "@mui/material";
import { fDate } from "../../../../utils/formatTime";
import Label from "../../../../components/label";
import Image from "../../../../components/image";
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";
import ConfirmDialog from "../../../../components/confirm-dialog";

SchoolTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function SchoolTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}) {
  const {
    name,
    address,
    schoolUid,
    city,
    state,
    zip,
    country,
    phoneNumber,
    email,
    website,
    type,
    board,
    isActive,
    isVerified,
    levels,
    createdAt,
  } = row;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Link
              noWrap
              color="inherit"
              variant="subtitle2"
              onClick={onViewRow}
              sx={{ cursor: "pointer" }}
            >
              {name}
            </Link>
          </Stack>
        </TableCell>

        <TableCell>{address}</TableCell>
        <TableCell>{schoolUid}</TableCell>
        <TableCell>{city}</TableCell>
        <TableCell>{state}</TableCell>
        <TableCell>{zip}</TableCell>
        <TableCell>{country}</TableCell>
        <TableCell>{phoneNumber}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{website}</TableCell>
        <TableCell>{type}</TableCell>
        <TableCell>{board}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={isActive ? "success" : "error"}
            sx={{ textTransform: "capitalize" }}
          >
            {isActive ? "Active" : "Inactive"}
          </Label>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={isVerified ? "success" : "error"}
            sx={{ textTransform: "capitalize" }}
          >
            {isVerified ? "Verified" : "Unverified"}
          </Label>
        </TableCell>
        <TableCell>{levels}</TableCell>
        <TableCell>{fDate(createdAt)}</TableCell>

        <TableCell align="right">
          <IconButton
            color={openPopover ? "primary" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}