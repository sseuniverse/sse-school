import PropTypes from "prop-types";
import { Link, Card, CardHeader, Stack } from "@mui/material";
import { _socials } from "../../../../../_mock/arrays";
import Iconify from "../../../../../components/iconify";

// ----------------------------------------------------------------------

SchoolSocialInfo.propTypes = {
  socialLinks: PropTypes.shape({
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    linkedin: PropTypes.string,
    twitter: PropTypes.string,
    github: PropTypes.string,
  }),
};

export default function SchoolSocialInfo({ socialInfo }) {
  //   const { githubLink, facebookLink, instagramLink, linkedinLink, twitterLink } =
  //     socialInfo;

  return (
    <Card>
      <CardHeader title="Social" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* {} */}
        <Stack key="FaceBook" direction="row" sx={{ wordBreak: "break-all" }}>
          <Iconify
            icon="eva:facebook-fill"
            sx={{
              mr: 2,
              flexShrink: 0,
              color: "#1877F2",
            }}
          />

          <Link
            href={socialInfo?.facebook || "https://facebook.com"}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {socialInfo?.facebook || "https://facebook.com"}
          </Link>
        </Stack>
        <Stack key="Instagram" direction="row" sx={{ wordBreak: "break-all" }}>
          <Iconify
            icon="ant-design:instagram-filled"
            sx={{
              mr: 2,
              flexShrink: 0,
              color: "#E02D69",
            }}
          />

          <Link
            href={socialInfo?.instagram || "https://instagram.com"}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {socialInfo?.instagram || "https://instagram.com"}
          </Link>
        </Stack>
        <Stack key="LinkedIn" direction="row" sx={{ wordBreak: "break-all" }}>
          <Iconify
            icon="eva:linkedin-fill"
            sx={{
              mr: 2,
              flexShrink: 0,
              color: "#007EBB",
            }}
          />

          <Link
            href={socialInfo?.linkedIn || "https://linked.in"}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {socialInfo?.linkedIn || "https://linked.in"}
          </Link>
        </Stack>
        <Stack key="Twitter" direction="row" sx={{ wordBreak: "break-all" }}>
          <Iconify
            icon="eva:twitter-fill"
            sx={{
              mr: 2,
              flexShrink: 0,
              color: "#00AAEC",
            }}
          />

          <Link
            href={socialInfo?.twitter || "https://x.com"}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {socialInfo?.twitter || "https://x.com"}
          </Link>
        </Stack>
        <Stack key="Github" direction="row" sx={{ wordBreak: "break-all" }}>
          <Iconify
            icon="eva:github-fill"
            sx={{
              mr: 2,
              flexShrink: 0,
              color: "#000000",
            }}
          />

          <Link
            href="https://iconify.design/docs/icon-components/react/"
            component="span"
            variant="body2"
            color="text.primary"
          >
            https://iconify.design/docs/icon-components/react/
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
