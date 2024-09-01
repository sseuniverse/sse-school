import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { kebabCase } from "change-case";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "../../redux/store";
import { getSchools } from "../../redux/slices/school";
import { PATH_DASHBOARD } from "../../routes/paths";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../components/settings";
import SchoolNewEditForm from "../../sections/dashboard/school/SchoolNewEditForm";

// ----------------------------------------------------------------------

export default function SchoolEditPage() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { id } = useParams();

  const currentSchool = useSelector((state) =>
    state.school.schools.find((school) => kebabCase(school.name) === id)
  );

  useEffect(() => {
    dispatch(getSchools());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> School: Edit school | SSE SMS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Edit product"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "School",
              href: PATH_DASHBOARD.school.root,
            },
            { name: currentProduct?.name },
          ]}
        />

        <SchoolNewEditForm isEdit currentSchool={currentSchool} />
      </Container>
    </>
  );
}
