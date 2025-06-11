import { React } from "react";
const Topbar = () => {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#727D73",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#727D73",
            color: "white",
          }}
        >
          <img
            src={"/logo.png"}
            alt={"My Brand"}
            height={"40px"}
            width={"40px"}
            style={{ margin: "5px" }}
          />
          <a href={"#"} style={{ margin: "5px", color: "white" }}>
            Contact
          </a>
          <a href={"#"} style={{ margin: "5px", color: "white" }}>
            About Us
          </a>
          <span style={{ margin: "5px", fontSize: "14px" }}>My Brand</span>
        </div>
        <div id={"topbar-menu-child"} style={{ position: "relative" }}>
          <details>
            <summary
              style={{
                listStyle: "none",
                backgroundColor: "transparent",
                color: "inherit",
                border: "1px solid currentColor",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Open Menu
            </summary>
            <div
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #ccc",
                top: "calc(100% +10px)",
                right: "0",
                borderRadius: "6px",
                boxShadow: "6px",
                zIndex: "1000",
                minWidth: "160px",
              }}
            >
              <ul style={{ listStyle: "none", margin: "0", padding: "8px 0" }}>
                <li
                  style={{
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    padding: "8px 16px",
                  }}
                >
                  Home
                </li>
                <li
                  style={{
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    padding: "8px 16px",
                  }}
                >
                  Profile
                </li>
                <li
                  style={{
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    padding: "8px 16px",
                  }}
                >
                  Settings
                </li>
                <li
                  style={{
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    padding: "8px 16px",
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          </details>
        </div>
      </nav>
    </div>
  );
};
export default Topbar;
