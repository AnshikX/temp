import { React } from "react";
import Topbar from "/src/components/Breeze_Layout/TopBar.jsx";
const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div id={"topbar-div"}>
        <Topbar />
      </div>
      <div
        id={"lower-div"}
        style={{
          flex: "1",
          overflow: "auto",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {children}
      </div>
    </div>
  );
};
export default Layout;
