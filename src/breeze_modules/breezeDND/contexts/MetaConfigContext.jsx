import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const MetaConfigContext = createContext();

export const MetaConfigProvider = ({ children }) => {
  const [fullMetaConfig, setFullMetaConfig] = useState({});

  return (
    <MetaConfigContext.Provider
      value={{
        fullMetaConfig,
        setFullMetaConfig,
      }}
    >
      {children}
    </MetaConfigContext.Provider>
  );
};

MetaConfigProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export const useMetaConfig = () => useContext(MetaConfigContext);
