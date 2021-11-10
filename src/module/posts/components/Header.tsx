import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

import { AuthContextProv } from "../../../context/authContext";

function AppHeader() {
  const { user, logout } = React.useContext(AuthContextProv);

  function handlerClickLogout(event: any) {
    logout();
  }

  return (
    <Box sx={{ flexGrow: 1 }} style={{ margin: -10 }}>
      <AppBar position="static" color="secondary">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6">Blog</Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/">
                Posts
              </Button>
              <Button color="inherit" component={Link} to="/create">
                Cadastrar Post
              </Button>
            </Box>

            <IconButton color="inherit" onClick={handlerClickLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default AppHeader;
