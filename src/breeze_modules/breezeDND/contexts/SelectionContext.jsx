import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { asClient, asFrameClient, asFrameHost } from "../postMessageBridge";

// Utils
const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Contexts
const SelectedItemIdContext = createContext();
const SelectedItemIdSetterContext = createContext();
const ItemDetailsContext = createContext();
const ItemDetailsSetterContext = createContext();

const RenderChildren = React.memo(
  ({ child }) => <>{child}</>,
  (prev, next) => prev.child === next.child
);
RenderChildren.displayName = "Render";
RenderChildren.propTypes = { child: PropTypes.node };

export const SelectionProvider = ({ children, renderMode }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  const syncing = useRef({
    selectedItemId: null,
    itemDetails: null,
    skipNextSelectedItemIdSync: false,
    skipNextItemDetailsSync: false,
  });

  // Invalidate stale itemDetails if selection changes
  useEffect(() => {
    setItemDetails((prev) => {
      if (prev?.config?.id !== selectedItemId) return null;
      return prev;
    });
  }, [selectedItemId]);

  // Send itemDetails to clients
  useEffect(() => {
    asClient.sendEvent("itemConfig", {
      itemConfig: itemDetails
        ? { ...itemDetails.config, children: null }
        : null,
    });
  }, [itemDetails]);

  // Sync itemDetails (only if it changed)
  useEffect(() => {
    if (syncing.current.skipNextItemDetailsSync) {
      syncing.current.skipNextItemDetailsSync = false;
      return;
    }

    const sanitizedConfig = itemDetails?.config
      ? { ...itemDetails.config, children: null }
      : null;

    if (
      !deepEqual(syncing.current.itemDetails?.config, sanitizedConfig)
    ) {
      const msg = [
        "UPDATE_ITEM_DETAILS",
        { itemDetails: { config: sanitizedConfig } },
      ];
      const bridge =
        renderMode === "HOST" ? asFrameHost : asFrameClient;
      bridge.sendRequest(...msg);

      syncing.current.itemDetails = { config: sanitizedConfig };
    }
  }, [renderMode, itemDetails]);

  // Sync selectedItemId (only if different)
  useEffect(() => {
    if (syncing.current.skipNextSelectedItemIdSync) {
      syncing.current.skipNextSelectedItemIdSync = false;
      return;
    }

    if (syncing.current.selectedItemId !== selectedItemId) {
      const msg = ["UPDATE_SELECTED_ITEM_ID", { selectedItemId }];
      const bridge =
        renderMode === "HOST" ? asFrameHost : asFrameClient;
      bridge.sendRequest(...msg);

      syncing.current.selectedItemId = selectedItemId;
    }
  }, [renderMode, selectedItemId]);

  // Receive updates
  useEffect(() => {
    const bridge =
      renderMode === "CLIENT" ? asFrameClient : asFrameHost;

    bridge.registerHandler("UPDATE_ITEM_DETAILS", ({ itemDetails }) => {
      const newConfig = itemDetails?.config || null;
      if (!deepEqual(syncing.current.itemDetails?.config, newConfig)) {
        syncing.current.skipNextItemDetailsSync = true;
        syncing.current.itemDetails = { config: newConfig };
        setItemDetails({ config: newConfig });
      }
    });

    bridge.registerHandler("UPDATE_SELECTED_ITEM_ID", ({ selectedItemId }) => {
      if (syncing.current.selectedItemId !== selectedItemId) {
        syncing.current.skipNextSelectedItemIdSync = true;
        syncing.current.selectedItemId = selectedItemId;
        setSelectedItemId(selectedItemId);
      }
    });

    return () => {
      bridge.removeHandler("UPDATE_ITEM_DETAILS");
      bridge.removeHandler("UPDATE_SELECTED_ITEM_ID");
    };
  }, [renderMode]);

  return (
    <SelectedItemIdContext.Provider value={selectedItemId}>
      <SelectedItemIdSetterContext.Provider value={setSelectedItemId}>
        <ItemDetailsContext.Provider value={itemDetails}>
          <ItemDetailsSetterContext.Provider value={setItemDetails}>
            <RenderChildren child={children} />
          </ItemDetailsSetterContext.Provider>
        </ItemDetailsContext.Provider>
      </SelectedItemIdSetterContext.Provider>
    </SelectedItemIdContext.Provider>
  );
};

SelectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
  renderMode: PropTypes.oneOf(["HOST", "CLIENT"]).isRequired,
};

// Hooks
export const useSelectedItemId = () => useContext(SelectedItemIdContext);
export const useSelectedItemDetails = () => useContext(ItemDetailsContext);
export const useSetSelectedItemId = () => useContext(SelectedItemIdSetterContext);
export const useSetItemDetails = () => useContext(ItemDetailsSetterContext);

export const useSetters = () => {
  const setSelectedItemId = useSetSelectedItemId();
  const setItemDetails = useSetItemDetails();
  return useMemo(
    () => ({ setSelectedItemId, setItemDetails }),
    [setSelectedItemId, setItemDetails]
  );
};
