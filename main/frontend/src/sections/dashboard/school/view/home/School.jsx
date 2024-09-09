import PropTypes from "prop-types";
import { Grid, Stack } from "@mui/material";
import SchoolAbout from "./SchoolAbout";
// import ProfilePostCard from "./ProfilePostCard";
// import ProfilePostInput from "./ProfilePostInput";
// import ProfileFollowInfo from "./ProfileFollowInfo";
import SchoolSocialInfo from "./SchoolSocialInfo";

// ----------------------------------------------------------------------

Profile.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ info, posts }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          {/* <ProfileFollowInfo
            follower={info.follower}
            following={info.following}
          /> */}

          <SchoolAbout
            quote={info?.quote}
            country={info?.country}
            email={info?.email}
            role={info?.role}
            company={info?.company}
            school={info?.school}
            established={info?.createdAt}
          />

          <SchoolSocialInfo socialLinks={info?.socialLinks} />
        </Stack>
      </Grid>

      {/* <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfilePostInput />

          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid> */}
    </Grid>
  );
}
