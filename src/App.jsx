import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "/src/context/ThemeContext.jsx";
const App = () => {
  return (
    <ChakraProvider children={undefined} value={undefined}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </ChakraProvider>
  );
};
export default App;
