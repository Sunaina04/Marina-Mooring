import { Avatar, IconButton, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      <Avatar
        alt="Agent logo"
        // src={
        //   updatedProfile?.profilePicture?.guid || settingDataGet?.profilePicture?.guid ? updatedProfile?.profilePicture?.guid || settingDataGet?.profilePicture?.guid : ""
        // }
      />
      <Typography
        sx={{ color: "#fff", mx: 1 }}
      >
        {/* {updatedProfile?.user_name || settingDataGet?.user_name} */}
      </Typography>
    </DrawerHeader>
  );
};

export default DrawerHeader;
