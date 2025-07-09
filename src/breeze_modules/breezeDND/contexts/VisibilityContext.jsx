import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const VisibilityContext = createContext();

export const useVisibility = () => {
  return useContext(VisibilityContext);
};

export const VisibilityProvider = ({ children }) => {
  const [visibilityState, setVisibilityState] = useState({});
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const toggleVisibility = (id) => {
    setVisibilityState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const setVisibility = (id, isVisible) => {
    setVisibilityState((prevState) => ({
      ...prevState,
      [id]: isVisible,
    }));
  };

  return (
    <VisibilityContext.Provider
      value={{
        visibilityState,
        toggleVisibility,
        setVisibility,
        hoveredItemId,
        setHoveredItemId
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};

VisibilityProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
