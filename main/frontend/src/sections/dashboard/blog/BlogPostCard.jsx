import PropTypes from "prop-types";
import { kebabCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Avatar,
  Typography,
  CardContent,
  Stack,
  Link,
} from "@mui/material";
import { PATH_DASHBOARD } from "../../../routes/paths";
import useResponsive from "../../../hooks/useResponsive";
import { fDate } from "../../../utils/formatTime";
import { fShortenNumber } from "../../../utils/formatNumber";
import Image from "../../../components/image";
import Iconify from "../../../components/iconify";
import TextMaxLine from "../../../components/text-max-line";
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const StyledOverlay = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "25%",
  height: "100%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  index: PropTypes.number,
  post: PropTypes.object,
};

export default function BlogPostCard({ post, index }) {
  const isDesktop = useResponsive("up", "md");
  const { cover, title, view, comment, share, author, createdAt, slug } = post;
  const latestPost = index === 0 || index === 1 || index === 2;

  if (isDesktop && latestPost) {
    return (
      <Card>
        <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{
            top: 24,
            left: 24,
            zIndex: 9,
            position: "absolute",
          }}
        />

        <PostContent
          title={title}
          view={view}
          comment={comment}
          share={share}
          createdAt={createdAt}
          index={index}
        />

        <StyledOverlay />
        {/* <Image alt="cover" src={cover} sx={{ height: 360 }} /> */}
        <ImageContainer>
          <Image alt="cover" src={cover} sx={{ height: 240 }} />
        </ImageContainer>
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ position: "relative" }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: "absolute",
            color: "background.paper",
          }}
        />

        <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: "absolute",
          }}
        />

        <Image alt="cover" src={cover} ratio="4/3" />
      </Box>

      <PostContent
        title={title}
        view={view}
        comment={comment}
        share={share}
        createdAt={createdAt}
        slug={slug}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  view: PropTypes.number,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  slug: PropTypes.string,
  comment: PropTypes.number,
  createdAt: PropTypes.string,
};

export function PostContent({
  title,
  view,
  comment,
  share,
  createdAt,
  slug,
  index,
}) {
  const isDesktop = useResponsive("up", "md");
  const linkTo = PATH_DASHBOARD.blog.view(slug);
  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { id: "comment", value: comment, icon: "eva:message-circle-fill" },
    { id: "view", value: view, icon: "eva:eye-fill" },
    { id: "share", value: share, icon: "eva:share-fill" },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: "absolute",
          color: "common.white",
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: "text.disabled",
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: "common.white",
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link component={RouterLink} to={linkTo} color="inherit">
        <TextMaxLine
          variant={isDesktop && latestPostLarge ? "h5" : "subtitle2"}
          line={2}
          persistent
        >
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: "text.disabled",
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: "common.white",
          }),
        }}
      >
        {POST_INFO.map((info) => (
          <Stack
            key={info.id}
            direction="row"
            alignItems="center"
            sx={{ typography: "caption", ml: info.id === "comment" ? 0 : 1.5 }}
          >
            <Iconify icon={info.icon} width={16} sx={{ mr: 0.5 }} />
            {fShortenNumber(info.value)}
          </Stack>
        ))}
      </Stack>
    </CardContent>
  );
}

// /**
//  * Renders a blog post card component with different styles based on the index and screen size.
//  *
//  * @param {Object} props - The component props.
//  * @param {number} props.index - The index of the post in the list.
//  * @param {Object} props.post - The post object containing details such as cover, title, view, comment, share, author, createdAt, and slug.
//  *
//  * @returns {JSX.Element} - The blog post card component.
//  */
// export default function BlogPostCard({ post, index }) {
//   const isDesktop = useResponsive("up", "md");
//   const { cover, title, view, comment, share, author, createdAt, slug } = post;
//   const latestPost = index === 0 || index === 1 || index === 2;

//   // Render the latest post card with overlay and avatar on desktop
//   if (isDesktop && latestPost) {
//     return (
//       <Card>
//         <Avatar
//           alt={author.name}
//           src={author.avatarUrl}
//           sx={{
//             top: 24,
//             left: 24,
//             zIndex: 9,
//             position: "absolute",
//           }}
//         />

//         <PostContent
//           title={title}
//           view={view}
//           comment={comment}
//           share={share}
//           createdAt={createdAt}
//           index={index}
//         />

//         <StyledOverlay />
//         <Image alt="cover" src={cover} sx={{ height: 360 }} />
//       </Card>
//     );
//   }

//   // Render the other post cards with SVG overlay and avatar
//   return (
//     <Card>
//       <Box sx={{ position: "relative" }}>
//         <SvgColor
//           src="/assets/shape_avatar.svg"
//           sx={{
//             width: 80,
//             height: 36,
//             zIndex: 9,
//             bottom: -15,
//             position: "absolute",
//             color: "background.paper",
//           }}
//         />

//         <Avatar
//           alt={author.name}
//           src={author.avatarUrl}
//           sx={{
//             left: 24,
//             zIndex: 9,
//             width: 32,
//             height: 32,
//             bottom: -16,
//             position: "absolute",
//           }}
//         />

//         <Image alt="cover" src={cover} ratio="4/3" />
//       </Box>

//       <PostContent
//         title={title}
//         view={view}
//         comment={comment}
//         share={share}
//         createdAt={createdAt}
//         slug={slug}
//       />
//     </Card>
//   );
// }

// /**
//  * Renders the content of a blog post card.
//  *
//  * @param {Object} props - The component props.
//  * @param {number} props.view - The number of views of the post.
//  * @param {number} props.index - The index of the post in the list.
//  * @param {number} props.share - The number of shares of the post.
//  * @param {string} props.title - The title of the post.
//  * @param {string} props.slug - The slug of the post.
//  * @param {number} props.comment - The number of comments on the post.
//  * @param {string} props.createdAt - The creation date of the post.
//  *
//  * @returns {JSX.Element} - The content of the blog post card.
//  */
// export function PostContent({
//   title,
//   view,
//   comment,
//   share,
//   createdAt,
//   slug,
//   index,
// }) {
//   const isDesktop = useResponsive("up", "md");
//   const linkTo = PATH_DASHBOARD.blog.view(slug);
//   const latestPostLarge = index === 0;
//   const latestPostSmall = index === 1 || index === 2;

//   const POST_INFO = [
//     { id: "comment", value: comment, icon: "eva:message-circle-fill" },
//     { id: "view", value: view, icon: "eva:eye-fill" },
//     { id: "share", value: share, icon: "eva:share-fill" },
//   ];

//   // Render the content of the blog post card
//   return (
//     <CardContent
//       sx={{
//         pt: 4.5,
//         width: 1,
//         ...((latestPostLarge || latestPostSmall) && {
//           pt: 0,
//           zIndex: 9,
//           bottom: 0,
//           position: "absolute",
//           color: "common.white",
//         }),
//       }}
//     >
//       <Typography
//         gutterBottom
//         variant="caption"
//         component="div"
//         sx={{
//           color: "text.disabled",
//           ...((latestPostLarge || latestPostSmall) && {
//             opacity: 0.64,
//             color: "common.white",
//           }),
//         }}
//       >
//         {fDate(createdAt)}
//       </Typography>

//       <Link component={RouterLink} to={linkTo} color="inherit">
//         <TextMaxLine
//           variant={isDesktop && latestPostLarge ? "h5" : "subtitle2"}
//           line={2}
//           persistent
//         >
//           {title}
//         </TextMaxLine>
//       </Link>

//       <Stack
//         flexWrap="wrap"
//         direction="row"
//         justifyContent="flex-end"
//         sx={{
//           mt: 3,
//           color: "text.disabled",
//           ...((latestPostLarge || latestPostSmall) && {
//             opacity: 0.64,
//             color: "common.white",
//           }),
//         }}
//       >
//         {POST_INFO.map((info) => (
//           <Stack
//             key={info.id}
//             direction="row"
//             alignItems="center"
//             sx={{ typography: "caption", ml: info.id === "comment" ? 0 : 1.5 }}
//           >
//             <Iconify icon={info.icon} width={16} sx={{ mr: 0.5 }} />
//             {fShortenNumber(info.value)}
//           </Stack>
//         ))}
//       </Stack>
//     </CardContent>
//   );
// }
