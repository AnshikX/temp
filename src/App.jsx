import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "/src/context/ThemeContext.jsx";
import TabsComponent from "/src/components/tabs";
const App = () => {
  return (
    // <ChakraProvider children={undefined} value={undefined}>
      <ThemeProvider>
        <TabsComponent />
      </ThemeProvider>
    // </ChakraProvider>
  );
};
export default App;
