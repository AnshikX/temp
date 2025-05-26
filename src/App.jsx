import { Outlet } from "react-router-dom";
import { ThemeProvider } from "/src/context/ThemeContext.jsx";
const App = () => {
  return (
    <>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </>
  );
};
export default App;
