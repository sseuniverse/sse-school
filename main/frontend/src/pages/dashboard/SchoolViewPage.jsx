import { Helmet } from "react-helmet-async"
import { useState } from "react"
import { Tab, Card, Tabs, Container, Box } from "@mui/material"
import { PATH_DASHBOARD } from "../../routes/paths"
import { useAuthContext } from "../../auth/useAuthContext"
import { _userAbout } from "../../_mock/arrays"
import Iconify from "../../components/iconify"
import CustomBreadcrumbs from "../../components/custom-breadcrumbs"
import { useSettingsContext } from "../../components/settings"
import { SchoolCover } from "../../sections/dashboard/school/view"

// ----------------------------------------------------------------------

export default function SchoolViewPage() {
    const { themeStretch } = useSettingsContext()
    const { user } = useAuthContext()

    // const TABS = [
    //     {
    //         value: 'profile',
    //         label: 'Profile',
    //         icon: <Iconify icon="ic:round-account-box" />,
    //         component: <Profile info={_userAbout} posts={_userFeeds} />,
    //     },
    //     {
    //         value: 'followers',
    //         label: 'Followers',
    //         icon: <Iconify icon="eva:heart-fill" />,
    //         component: <ProfileFollowers followers={_userFollowers} />,
    //     },
    //     {
    //         value: 'friends',
    //         label: 'Friends',
    //         icon: <Iconify icon="eva:people-fill" />,
    //         component: (
    //             <ProfileFriends
    //                 friends={_userFriends}
    //                 searchFriends={searchFriends}
    //                 onSearchFriends={(event) => setSearchFriends(event.target.value)}
    //             />
    //         ),
    //     },
    //     {
    //         value: 'gallery',
    //         label: 'Gallery',
    //         icon: <Iconify icon="ic:round-perm-media" />,
    //         component: <ProfileGallery gallery={_userGallery} />,
    //     },
    // ];

    return (
        <>
            <Helmet>
                <title>School: Profile | SSE SMS</title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <CustomBreadcrumbs heading="School" links={[
                    { name: 'Dashboard', href: PATH_DASHBOARD.root },
                    { name: 'School', href: PATH_DASHBOARD.school.root },
                    { name: user?.displayName },
                ]} />
                <Card
                    sx={{
                        mb: 3,
                        height: 280,
                        position: 'relative',
                    }}
                >
                    <ProfileCover name={user?.displayName} role={_userAbout.role} cover={_userAbout.cover} />
                </Card>
            </Container>
        </>
    )
}