import { Outlet } from "react-router-dom";
import { ThemeProvider } from "/src/context/ThemeContext.jsx";
import TabsComponent from "/src/components/tabs";
const App = () => {
  return (
      <ThemeProvider>
        <TabsComponent />
      </ThemeProvider>
  );
};
export default App;
