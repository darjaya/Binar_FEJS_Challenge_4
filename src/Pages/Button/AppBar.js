import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";

const StyledLink = styled(Link)`
  text-decoration: none;
`;
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyledLink to="/">
            <IconButton color="inherit">
              <Tooltip title="Home">
                <HomeIcon color="putih" />
              </Tooltip>
            </IconButton>
          </StyledLink>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h2>TODO LIST APPLICATION</h2>
          </Typography>
          <IconButton color="inherit">
            <Tooltip title="Settings">
              <SettingsIcon />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
