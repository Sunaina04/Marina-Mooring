import * as React from "react";
import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { NavLink, NavLinkProps, Outlet } from "react-router-dom";
import { drawerWidth } from "../../constants";
import { SidebarMenu } from "./components/SidebarMenu";
import Header from "./components/Header";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(() => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
}));

const AdminLayout = () => {
  const [openSubMenus, setOpenSubMenus] = React.useState(
    new Array(SidebarMenu.length).fill(false)
  );
  const [selectedSubcategory, setSelectedSubcategory] =
    React.useState<any>(null);

  const handleExpand = (index: number) => {
    setOpenSubMenus((prev) => {
      const updatedSubMenus = new Array(SidebarMenu.length).fill(false);
      updatedSubMenus[index] = !prev[index];
      return updatedSubMenus;
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          "& .MuiPaper-root": {
            background: "#F2F2F2",
            borderRight: "none",
            marginTop: "80px",
            width: "290px",
          },
        }}
      >
        <List disablePadding>
          {SidebarMenu.map((item, index) => (
            <React.Fragment key={index}>
              {item.name && (
                <ListItem
                  key={item.name}
                  disablePadding
                  sx={{
                    display: "flex",
                    background: "#D9D9D9",
                    flexDirection: "column",
                    border: "1px solid #B3B3B3",
                  }}
                >
                  <ListItemButton
                    component={NavLink as React.FC<NavLinkProps>}
                    to={item.link}
                    sx={{
                      width: "100%",
                      height: "auto",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: "3px 16px",
                      "&:hover": {
                        backgroundColor: "#EDEDED",
                      },
                    }}
                    onClick={() => {
                      setSelectedSubcategory(null);
                      setSelectedSubcategory(0);
                      item.subcategories && handleExpand(index);
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: "auto" }}>
                      <img
                        src={item.icon}
                        alt=""
                        width={17}
                        style={{ marginRight: "12.5px", marginLeft: "10px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: "12.5px",
                          fontWeight: 700,
                          lineHeight: "1.5",
                          letterSpacing: "0.2px",
                          textAlign: "left",
                          color: "#000000",
                        },
                      }}
                    />
                    {item.subcategories && (
                      <ListItemIcon sx={{ minWidth: "auto" }}>
                        {openSubMenus[index] ? (
                          <img
                            src="/assets/images/minus.png"
                            alt="Minus"
                            style={{ width: "10px", marginLeft: "8px" }}
                          />
                        ) : (
                          <img
                            src="/assets/images/plus.png"
                            alt="Plus"
                            style={{ width: "10px", marginLeft: "8px" }}
                          />
                        )}
                      </ListItemIcon>
                    )}
                  </ListItemButton>

                  {item.subcategories && openSubMenus[index] && (
                    <List disablePadding>
                      {item.subcategories.map((subcategory, subIndex) => (
                        <ListItem
                          key={subIndex}
                          disablePadding
                          sx={{
                            display: "flex",
                            background: "#F2F2F2",
                            marginRight: "100px",
                            border: "1px solid #B3B3B3",
                          }}
                        >
                          <ListItemButton
                            component={NavLink as React.FC<NavLinkProps>}
                            to={subcategory.link}
                            sx={{
                              width: "100%",
                              height: "auto",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              padding: "3px 16px",
                              "&:hover": {
                                backgroundColor: "#EDEDED",
                              },
                            }}
                            onClick={() => setSelectedSubcategory(subIndex)}
                          >
                            <ListItemIcon
                              sx={{ marginLeft: "60px", marginRight: "10px" }}
                            >
                              <img
                                src={subcategory.icon}
                                alt=""
                                width={17}
                                style={{ marginRight: "8px" }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={subcategory.name}
                              primaryTypographyProps={{
                                sx: {
                                  fontSize: "12.5px",
                                  fontWeight:
                                    selectedSubcategory === subIndex
                                      ? 700
                                      : 400,
                                  lineHeight: "1.5",
                                  letterSpacing: "0.2px",
                                  textAlign: "left",
                                  marginLeft: "-30px",
                                  color: "#0000000",
                                },
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </ListItem>
              )}
              {index !== SidebarMenu.length - 1 && (
                <Divider sx={{ height: "25px" }} />
              )}
            </React.Fragment>
          ))}
        </List>


        <Box sx={{ position: "fixed", top: "85%", width: "19%", display:"flex", flexDirection:"column", gap:"1rem"}}>
          
          <Box
            sx={{
              background: "#D9D9D9",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",

              gap:"1rem"
            }}
          >
            <ListItemButton
              component={NavLink as React.FC<NavLinkProps>}
              to={"/permission"}
              sx={{
                width: "100%",
                height: "auto",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "3px 16px",
                "&:hover": {
                  backgroundColor: "#EDEDED",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <img
                  src="/assets/images/square.png"
                  alt="Logout"
                  width={17}
                  style={{ marginRight: "12.5px", marginLeft: "10px" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Permissions"
                primaryTypographyProps={{
                  sx: {
                    fontSize: "12.5px",
                    fontWeight: 700,
                    lineHeight: "1.5",
                    letterSpacing: "0.2px",
                    textAlign: "left",
                  },
                }}
              />
            </ListItemButton>
          </Box>


          <Box
            sx={{
              background: "#D9D9D9",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",

              gap:"1rem"
            }}
          >
            <ListItemButton
              component={NavLink as React.FC<NavLinkProps>}
              to={""}
              sx={{
                width: "100%",
                height: "auto",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: "3px 16px",
                "&:hover": {
                  backgroundColor: "#EDEDED",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <img
                  src="/assets/images/square.png"
                  alt="Logout"
                  width={17}
                  style={{ marginRight: "12.5px", marginLeft: "10px" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{
                  sx: {
                    fontSize: "12.5px",
                    fontWeight: 700,
                    lineHeight: "1.5",
                    letterSpacing: "0.2px",
                    textAlign: "left",
                  },
                }}
              />
            </ListItemButton>
          </Box>



        </Box> 















      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: "82%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
