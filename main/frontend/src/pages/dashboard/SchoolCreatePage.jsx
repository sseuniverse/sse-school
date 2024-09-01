import { Helmet } from "react-helmet-async";
import { Container } from "@mui/material";
import { PATH_DASHBOARD } from "../../routes/paths";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../components/settings";
import SchoolNewEditForm from "../../sections/dashboard/school/SchoolNewEditForm";

// ----------------------------------------------------------------------

export default function SchoolEditPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> School: New school | SSE SMS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Create a new school"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            {
              name: "School",
              href: PATH_DASHBOARD.school.root,
            },
            { name: "New School" },
          ]}
        />

        <SchoolNewEditForm />
      </Container>
    </>
  );
}
