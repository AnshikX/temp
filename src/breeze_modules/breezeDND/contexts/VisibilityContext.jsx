import { createContext, useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { asFrameClient, asFrameHost } from "../postMessageBridge";

const VisibilityContext = createContext();

export const useVisibility = () => {
  return useContext(VisibilityContext);
};

export const VisibilityProvider = ({ children, renderMode }) => {
  const [visibilityState, setVisibilityState] = useState({});
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const syncing = useRef({
    visibilityState,
    hoveredItemId,
  });

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

  useEffect(() => {
    if (
      JSON.stringify(syncing.current.visibilityState) !==
      JSON.stringify(visibilityState)
    ) {
      const msg = ["UPDATE_VISIBILITY", { visibilityState }];
      (renderMode === "HOST" ? asFrameHost : asFrameClient).sendRequest(...msg);
      syncing.current.visibilityState = visibilityState;
    }
  }, [visibilityState, renderMode]);

  useEffect(() => {
    if (syncing.current.hoveredItemId !== hoveredItemId) {
      const msg = ["UPDATE_HOVERED_ITEM_ID", { hoveredItemId }];
      (renderMode === "HOST" ? asFrameHost : asFrameClient).sendRequest(...msg);
      syncing.current.hoveredItemId = hoveredItemId;
    }
  }, [hoveredItemId, renderMode]);

  useEffect(() => {
    let messageBridge;

    messageBridge = renderMode === "CLIENT" ? asFrameClient : asFrameHost;

    messageBridge.registerHandler(
      "UPDATE_VISIBILITY",
      ({ visibilityState }) => {
        syncing.current.visibilityState = visibilityState;
        setVisibilityState(visibilityState);
      }
    );

    messageBridge.registerHandler(
      "UPDATE_HOVERED_ITEM_ID",
      ({ hoveredItemId }) => {
        syncing.current.hoveredItemId = hoveredItemId;
        setHoveredItemId(hoveredItemId);
        return true;
      }
    );

    return () => {
      messageBridge.removeHandler("UPDATE_VISIBILITY");
      messageBridge.removeHandler("UPDATE_HOVERED_ITEM_ID");
    };
  }, [renderMode]);

  return (
    <VisibilityContext.Provider
      value={{
        visibilityState,
        toggleVisibility,
        setVisibility,
        hoveredItemId,
        setHoveredItemId,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};

VisibilityProvider.propTypes = {
  children: PropTypes.node.isRequired,
  renderMode: PropTypes.string,
};
