import React from "react";
import { styled } from "@mui/material";

const DrawerHeader = () => {
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
      <DrawerHeader>
        <img
          src={"/assets/images/Moorfind.png"}
          alt="logo"
          style={{
            height: "120px",
            width: "120px",
            // marginLeft: "20px",
            // marginTop: "-20px",
            background: "balck",
          }}
        />
      </DrawerHeader>
    </header>
  );
};

export default DrawerHeader;
