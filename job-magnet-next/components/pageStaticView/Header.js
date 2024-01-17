import React from "react";
import {AppBar, Box, Button, Stack, Toolbar, Typography} from "@mui/material";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";

const Header = () => {
  const { data: session } = useSession();
  const { push } = useRouter();

  if (session) {
    return (
      <AppBar
        position="static"
        sx={{ backgroundColor: "#121212", color: "#fff", marginBottom: "20px" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, marginLeft: "240px" }}></Box>
          <Stack direction="row" spacing="2em">
            <Typography variant="body1">
              Aktualnie zalogowany: {session.user.name}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                signOut({ redirect: false }).then(() =>
                  push(
                    `http://172.22.5.249:8080/realms/fit/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
                      "http://localhost:3000/",
                    )}&client_id=fit`,
                  ),
                );
              }}
            >
              Wyloguj
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#121212", color: "#fff", marginBottom: "20px" }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, marginLeft: "240px" }}></Box>
        <Stack direction="row" spacing="2em">
          <Button variant="contained" onClick={() => signIn("keycloak")}>
            Zaloguj
          </Button>
          <Button variant="contained" onClick={() => push("/register")}>
            Zarejestruj
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
