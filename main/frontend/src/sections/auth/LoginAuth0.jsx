import { Alert, Tooltip, Stack, Typography, Box, Button } from "@mui/material";
import { useAuthContext } from "../../auth/useAuthContext";
import LoginLayout from "../../layouts/login";

// ----------------------------------------------------------------------

export default function LoginAuth0() {
  const { method } = useAuthContext();

  // NOTE: Turn off comments below to enable Auth0.
  // const { login } = useAuthContext();

  const handleLoginAuth0 = async () => {
    try {
      // NOTE: Turn off comments below to enable Auth0.
      // await login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Sign in to Minimal</Typography>

        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: "absolute", right: 0 }}
          />
        </Tooltip>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>admin@demo.com</strong> / password :
        <strong> 123456</strong>
      </Alert>

      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        onClick={handleLoginAuth0}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Login
      </Button>
    </LoginLayout>
  );
}
