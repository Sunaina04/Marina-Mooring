import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { SidebarMenu } from "./components/SidebarMenu";
import Header from "./components/Header";
import { filterModalStyle } from "../../style";
import { style } from "../../customComponent/CustomModal";

const AdminLayout = () => {
  const [openSubMenus, setOpenSubMenus] = useState(
    new Array(SidebarMenu.length).fill(false)
  );
  const [open, setOpen] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null
  ); // Adjusted the type here

  const handleExpand = (index: number) => {
    setOpenSubMenus((prev) => {
      const updatedSubMenus = new Array(SidebarMenu.length).fill(false);
      updatedSubMenus[index] = !prev[index];
      return updatedSubMenus;
    });
    setSelectedSubcategory(index); // Assigning the selected subcategory index
  };

  useEffect(() => {
    if (open) {
      filterModalStyle.left = "40vw";
      style.left = "58.2%";
    } else {
      filterModalStyle.left = "34vw";
      style.left = "52%";
    }
  }, [open]);

  const handleToggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <button
          onClick={handleToggleDrawer}
          style={{
            height: "35px",
            width: "20px",
            minWidth: "5px",
            marginRight: "-20rem",
            marginLeft: open ? "16.4rem" : "4rem",
            marginTop: "5rem",
            border: "1px solid #B3B3B3",
            display: "inline-block",
            background: "#D9D9D9",
            position: "fixed",
          }}
        >
          <img
            src={
              open
                ? "/assets/images/chevron_left.svg"
                : "/assets/images/chevron_right.svg"
            }
            alt={open ? "ChevronLeft" : "ChevronRight"}
            style={{ width: "100%", height: "100%", marginLeft: "-1px" }}
          />
        </button>

        <div
          style={{
            width: open ? "16.38rem" : "4rem",
            background: "#F2F2F2",
            borderRight: "none",
            transition: "width 0.3s ease-in-out",
          }}
        >
          {SidebarMenu.map((item, index) => (
            <div key={index}>
              {item.name && (
                <NavLink
                  to={item.link}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "3px 16px",
                    cursor: "pointer",
                    background: "#D9D9D9",
                    border: "1px solid #B3B3B3",
                  }}
                  onClick={() => {
                    setSelectedSubcategory(null);
                    handleExpand(index); // Call handleExpand directly
                  }}
                >
                  <img
                    src={item.icon}
                    alt=""
                    width={17}
                    style={{ marginRight: "15px", marginLeft: "8px" }}
                  />
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 700,
                      letterSpacing: "0.2px",
                      textAlign: "left",
                      color: "#000000",
                      display: open ? "flex" : "none",
                    }}
                  >
                    {item.name}
                  </span>
                  {item.subcategories && (
                    <img
                      src={
                        openSubMenus[index]
                          ? "/assets/images/minus.png"
                          : "/assets/images/plus.png"
                      }
                      alt={openSubMenus[index] ? "Minus" : "Plus"}
                      style={{ width: "10px", marginLeft: "8px" }}
                    />
                  )}
                </NavLink>
              )}

              {item.subcategories && openSubMenus[index] && (
                <div>
                  {item.subcategories.map((subcategory, subIndex) => (
                    <NavLink
                      to={subcategory.link}
                      style={{ textDecoration: "none" }}
                      key={subIndex}
                    >
                      <div
                        style={{
                          width: "100%",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          padding: "3px 16px",
                          cursor: "pointer",
                          background: "#F2F2F2",
                          marginRight: open ? "100px" : "0px",
                          border: "1px solid #B3B3B3",
                        }}
                        onClick={() => setSelectedSubcategory(subIndex)}
                      >
                        <img
                          src={subcategory.icon}
                          alt=""
                          width={17}
                          style={{ marginRight: "8px", marginLeft: "50px" }}
                        />
                        {open && (
                          <span
                            style={{
                              fontSize: "12.5px",
                              fontWeight:
                                selectedSubcategory === subIndex ? 700 : 400,
                              lineHeight: "1.5",
                              letterSpacing: "0.2px",
                              textAlign: "left",
                              marginLeft: "-30px",
                              color: "#0000000",
                            }}
                          >
                            {subcategory.name}
                          </span>
                        )}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
              {index !== SidebarMenu.length - 1 && (
                <div style={{ height: "25px" }} />
              )}
              <div
                style={{
                  position: "fixed",
                  top: "95%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    background: "#D9D9D9",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <NavLink to={""} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        height: "35px",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "3px 16px",
                        cursor: "pointer",
                        border: "1px solid #B3B3B3",
                      }}
                    >
                      <img
                        src="/assets/images/square.png"
                        alt="Logout"
                        width={17}
                        style={{ marginRight: "15px", marginLeft: "10px" }}
                      />
                      {open && (
                        <span
                          style={{
                            fontSize: "12.5px",
                            fontWeight: 700,
                            letterSpacing: "0.2px",
                            textAlign: "left",
                          }}
                        >
                          Logout
                        </span>
                      )}
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            flexGrow: 1,
            padding: 0,
            width: "82%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
