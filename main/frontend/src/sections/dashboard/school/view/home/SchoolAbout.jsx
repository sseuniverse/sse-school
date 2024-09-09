import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Link, Card, Typography, CardHeader, Stack } from "@mui/material";
import Iconify from "../../../../../components/iconify";
import { fDate } from "../../../../../utils/formatTime"

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  company: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string,
  quote: PropTypes.string,
  role: PropTypes.string,
  school: PropTypes.string,
  established: PropTypes.string,
};

export default function ProfileAbout({
  quote,
  country,
  email,
  role,
  company,
  school,
  established
}) {
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{quote}</Typography>

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Link href={`mailto:${email}`} variant="body2">
            {email}
          </Link>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:clock-fill" />
          <Typography href={`mailto:${email}`} variant="body2">
            {fDate(established)}
          </Typography>
        </Stack>

        {/* <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack> */}

        {/* <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack> */}
      </Stack>
    </Card>
  );
}
