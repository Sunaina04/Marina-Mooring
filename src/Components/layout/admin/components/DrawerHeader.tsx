import React from "react";
import { IconButton, styled } from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

interface DrawerHeaderProps {
  handleDrawerClose: () => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ handleDrawerClose }) => {
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
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon sx={{ color: "#fff" }} />
        </IconButton>
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
