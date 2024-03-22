import * as React from "react";
import {
  Box,
  CssBaseline,
  CSSObject,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Toolbar,
} from "@mui/material";
import { useEffect } from "react";
import MuiDrawer from "@mui/material/Drawer";
import Header from "./components/Header";
import { NavLink, NavLinkProps, Outlet, useLocation } from "react-router-dom";
import DrawerHeader from "./components/DrawerHeader";
import { drawerWidth } from "../../constants";
import { filterModalStyle } from "../../style";
import { style } from "../../customComponent/CustomModal";
import { primary } from "../../../theme/themeColors";
import { SidebarMenu } from "./components/SidebarMenu";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const AdminLayout = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const location = useLocation();

  useEffect(() => {
    if (open) {
      filterModalStyle.left = "40vw"
      style.left="58.2%"
    } else {
      filterModalStyle.left = "34vw"
      style.left="52%"
    }
  }, [open]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header/>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiPaper-root": {
            background: `linear-gradient(${primary.bg}, #152844)`,
            borderRight: "none",
          },
        }}
      >
        <DrawerHeader/>
        <List sx={{paddingTop:"0px"}}>
          {SidebarMenu.map((itm) => (
            <ListItem
              key={itm.name}
              disablePadding
              sx={{
                display: "block",
                paddingTop: "0px",
                color: "#fff",
                "& .active": {
                  backgroundColor: "#f2f2f2",
                  color: "#000",

                  ".MuiListItemIcon-root": {
                    color: "#000",
                  },
                },
              }}
            >
              <ListItemButton
                component={NavLink as React.FC<NavLinkProps>}
                to={itm.link}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  // borderBottom: "1px solid #fff",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    width: "90%",
                    height: "0.5px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#fff",
                  }}
                >
                  {location.pathname.includes(itm.link) ? (
                    <img src={"itm.iconHover"} alt="" width={30} />
                  ) : (
                    <img src={"itm.icon"} alt="" width={30} />
                  )}
                  {/* {({ isActive }) =>
                    isActive ? (
                      <img src={itm.icon} alt="" width={30} />
                    ) : (
                      <img src={itm.iconHover} alt="" width={30} />
                    )
                  } */}
                </ListItemIcon>
                <ListItemText
                  primary={itm.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 0, width: "82%" }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
