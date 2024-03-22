import { Avatar, IconButton, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import logo from "../../../../assets/images";
// import { useContext } from "react";

const DrawerHeader: React.FC = () => {
  /* ***************************************************
   * NOTE: Define Variables
   ****************************************************/

  const navigate = useNavigate();

//   const [, , uerProfile] = useContext(TitleContext) as any;
//   const updatedProfile = uerProfile && JSON.parse(uerProfile)

  const settingDataGet = JSON.parse(localStorage.getItem("userData") as string)


  console.log("settingDataGetsettingDataGet", settingDataGet)
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  /* ***************************************************
   * NOTE: Render Method
   ****************************************************/
  return (
    <DrawerHeader
      sx={{ justifyContent: "space-between", display: "flex", gap: "2px" }}
    >
     <img src={"logo"} alt="logo"/>
    </DrawerHeader>
  );
};

export default DrawerHeader;
