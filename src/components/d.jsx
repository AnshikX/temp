import { React } from "react";
import router from "/src/Routing.jsx";
import { authLoginCreate } from "/src/services/Breeze API_1/Auth.jsx";
const D = () => {
  const arr = [];
  return (
    <div className={"p-4"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          padding: "1rem",
          margin: "20px auto",
          width: "100%",
          height: "calc(100vh - 40px)",
          maxWidth: "1200px",
          minHeight: "300px",
          backgroundColor: "#f5f5f5",
          color: "rgba(0, 0, 0, 0.87)",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          overflow: "auto",
          transition: "all 0.3s ease-in-out",
          transform: "translateY(0)",
          zIndex: 10,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: "14px",
          lineHeight: 1.5,
          letterSpacing: "0.5px",
          textAlign: "left",
          userSelect: "none",
          cursor: "pointer",
          visibility: "visible",
          opacity: 1,
          backdropFilter: "blur(5px)",
          WebkitUserSelect: "none",
          WebkitBackdropFilter: "blur(5px)",
        }}
      />
      <div
        key={router}
        onChange={() => {}}
        onClick={() => {}}
        placeholder={authLoginCreate()}
        style={{
          width: "110px",
          maxWidth: "13%",
          minWidth: "4em",
          height: "13vw",
          marginTop: "6px",
          marginRight: "3px",
          marginBottom: "4px",
          marginLeft: "2px",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          gap: "1px",
          overflow: "scroll",
          overflowY: "visible",
          overflowX: "visible",
          backgroundColor: "#d2a3a3",
          color: "#291f1f",
          borderWidth: "1px",
          borderStyle: "dashed",
          borderRadius: "5px",
          borderColor: "#2bf7b3",
          fontFamily: "Roboto",
          fontSize: "3rem",
          fontWeight: "bold",
          lineHeight: "42px",
          cursor: "copy",
        }}
        type={"date"}
      >
        Hello World
      </div>
    </div>
  );
};
export default D;
