import { createContext, useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { asFrameClient, asFrameHost } from "../postMessageBridge";

const MetaConfigContext = createContext();

export const MetaConfigProvider = ({ children, renderMode }) => {
  const [fullMetaConfig, setFullMetaConfig] = useState({});
  const syncing = useRef({
    fullMetaConfig,
  });

  useEffect(() => {
    if (
      JSON.stringify(syncing.current.fullMetaConfig) !==
      JSON.stringify(fullMetaConfig)
    ) {
      const msg = ["UPDATE_META_CONFIG", { fullMetaConfig }];
      (renderMode === "HOST" ? asFrameHost : asFrameClient).sendRequest(...msg);
    }
  }, [fullMetaConfig, renderMode]);

  useEffect(() => {
    let messageBridge;
    messageBridge = renderMode === "CLIENT" ? asFrameClient : asFrameHost;
      messageBridge.registerHandler(
        "UPDATE_META_CONFIG",
        ({ fullMetaConfig }) => {
          syncing.current.fullMetaConfig = fullMetaConfig;
          setFullMetaConfig(fullMetaConfig);
        }
      );

      return () => {
        messageBridge.removeHandler("UPDATE_META_CONFIG");
    }
  }, [renderMode]);

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
  renderMode: PropTypes.string, // "CLIENT" or "HOST"
};

export const useMetaConfig = () => useContext(MetaConfigContext);
