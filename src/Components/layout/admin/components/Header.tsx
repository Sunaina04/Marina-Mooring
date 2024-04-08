import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/ExpandMore"; // Changed to ExpandMore
import {
  Avatar,
  Box,
  List,
  Menu,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { drawerWidth } from "../../../constants";

interface HeaderProps {
  openHeader: boolean;
  handleDrawerOpen: () => void;
}

const Header: React.FC = () => {
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "black",
        }}
      >
        <Toolbar>
          {/* Left side content */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "auto", // Pushes content to the right
            }}
          >
            <img
              alt="Logo"
              src={"/assets/images/Moorfind.png"}
              style={{ width: 100, height: 80, marginRight: 8 }}
            />
          </Box>

          {/* Right side content */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {/* Add user's name and image*/}
            <Avatar alt="user" src="" />
            <Typography
              variant="body1"
              color="inherit"
              sx={{ marginRight: -3 }}
            >
              John Smith
            </Typography>
            {/* Add the expandable icon (ExpandMore) */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleMenu}
              aria-haspopup="true"
              aria-controls="menu-appbar"
              aria-label="account of current user"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
        {/* Menu for the expandable icon */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          sx={{
            "& .MuiPaper-root": {
              right: 16,
              width: "250px",
              marginLeft: "auto",
            },
          }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          component={List}
        ></Menu>
      </AppBar>
    </>
  );
};

export default Header;
