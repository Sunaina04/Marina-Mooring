// src/components/Header.js
import React from "react";
import { styled } from "@mui/material";

const Header = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  return (
    <header>
      <DrawerHeader
        sx={{ justifyContent: "space-between", display: "flex", gap: "1px" }}
      >
        <img src={"/assets/images/Moorfind.png"} alt="logo" />
      </DrawerHeader>
    </header>
  );
};

export default Header;
