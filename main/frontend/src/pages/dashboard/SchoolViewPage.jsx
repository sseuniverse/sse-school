import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Tab, Card, Tabs, Container, Box } from "@mui/material";
import { PATH_DASHBOARD } from "../../routes/paths";
import { useAuthContext } from "../../auth/useAuthContext";
import { _userAbout } from "../../_mock/arrays";
import Iconify from "../../components/iconify";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import { useSettingsContext } from "../../components/settings";
import { SchoolCover, School } from "../../sections/dashboard/school/view";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../redux/store";
import { getSchool } from "../../redux/slices/school";

// ----------------------------------------------------------------------

export default function SchoolViewPage() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchFriends, setSearchFriends] = useState('');
  const [currentTab, setCurrentTab] = useState('overview')

  useEffect(() => {
    dispatch(getSchool(id));
  }, [dispatch, id]);

  const { school } = useSelector((state) => state.school);
  const namAdd = `${school?.name}, ${school?.city}`;
  const disAdd = `${school?.state}, ${school?.country}`;

  // console.log(school)

  const TABS = [
    {
      value: "overview",
      label: "Overview",
      icon: <Iconify icon="ic:overview" />,
      component: <School info={school} />,
    },
    {
      value: "school",
      label: "School",
      icon: <Iconify icon="ic:round-account-box" />,
      component: <School info={school} />,
    },
    //   {
    //       value: 'followers',
    //       label: 'Followers',
    //       icon: <Iconify icon="eva:heart-fill" />,
    //       component: <ProfileFollowers followers={_userFollowers} />,
    //   },
    //   {
    //       value: 'friends',
    //       label: 'Friends',
    //       icon: <Iconify icon="eva:people-fill" />,
    //       component: (
    //           <ProfileFriends
    //               friends={_userFriends}
    //               searchFriends={searchFriends}
    //               onSearchFriends={(event) => setSearchFriends(event.target.value)}
    //           />
    //       ),
    //   },
    //   {
    //       value: 'gallery',
    //       label: 'Gallery',
    //       icon: <Iconify icon="ic:round-perm-media" />,
    //       component: <ProfileGallery gallery={_userGallery} />,
    //   },
  ];

  return (
    <>
      <Helmet>
        <title>School: Profile | SSE SMS</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="School"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "School", href: PATH_DASHBOARD.school.root },
            { name: school?.name },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <SchoolCover
            name={namAdd}
            role={disAdd}
            cover={_userAbout.cover}
            school={school}
          />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: "absolute",
              bgcolor: "background.paper",
              "& .MuiTabs-flexContainer": {
                pr: { md: 3 },
                justifyContent: {
                  sm: "center",
                  md: "flex-end",
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
