import React from "react";
import { styled } from "@mui/material";

const Header = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    background: "black",
    width: "200px",
    height: "20%",
  }));
  
  return (
    <header>
      <DrawerHeader>
        <img
          src={"/assets/images/Moorfind.png"}
          alt="logo"
          style={{
            height: "80%",
            width: "120px",
            marginLeft: "20px",
            marginTop: "-20px",
          }}
        />
      </DrawerHeader>
    </header>
  );
};

export default Header;
