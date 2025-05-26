import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import "../styles/ThemeContext.css";

const availableThemes = ["theme-default","theme-modern", "theme-retro", "theme-pastel", "theme-high-contrast"];
const ThemeContext = createContext();

const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const defaultTheme = "theme-default";
  const defaultMode = "light";

  const [themeName, setThemeName] = useState(defaultTheme);
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeName") || defaultTheme;
    const savedMode = localStorage.getItem("mode") || defaultMode;

    setThemeName(savedTheme);
    setMode(savedMode);

    updateBodyClass(savedTheme, savedMode);
  }, []);

  const updateBodyClass = (theme, mode) => {
    document.body.className = `${theme} ${mode}`;
  };

  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
    updateBodyClass(themeName, newMode);
  };

  const setTheme = (newTheme) => {
    setThemeName(newTheme);
    localStorage.setItem("themeName", newTheme);
    updateBodyClass(newTheme, mode);
  };

  return (
    <ThemeContext.Provider value={{ themeName, mode, toggleMode, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { useThemeContext };
export default ThemeContext;
