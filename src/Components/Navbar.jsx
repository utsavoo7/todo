import {
  Avatar,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"0 20px"}
      height={80}
      style={{
        borderBottom: "solid 1px #00000022",
      }}
    >
      <Grid item>
        <Typography fontSize={30} fontFamily={"Alkatra"}>
          UKri Apps
        </Typography>
      </Grid>

      <Grid item>
        <Button
          onClick={(event) => {
            setShowMenu(event.currentTarget);
          }}
          style={{
            fontWeight: 500,
          }}
        >
          <Avatar sx={{ bgcolor: "#002b5b" }} variant="rounded">
            u
          </Avatar>
        </Button>
        <Menu
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom",
          }}
          id="basic-menu"
          anchorEl={showMenu}
          open={Boolean(showMenu)}
          onClose={() => setShowMenu(null)}
        >
          <MenuItem
            onClick={() => {
              setShowMenu(null);
              localStorage.clear();
              navigate("/");
              auth.signOut();
              window.location.reload();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Navbar;
