import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelectedItemId, useSetters } from "../contexts/SelectionContext";
import { usePushChanges } from "../contexts/UndoRedoContext";
import deepCopy from "../../utils/deepcopy";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackWithReload } from "../utils/FallbackWithReload";

const TextRenderer = ({
  item,
  handleSelect,
  updateItem,
  handleMouseOver,
  handleMouseOut,
  opacity,
  drag,
  isPreview,
  zbase = 0,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(item);
  const [errorResetKey, setErrorResetKey] = useState(0);

  const selectedItemId = useSelectedItemId();
  const { setItemDetails } = useSetters();
  const { pushChanges } = usePushChanges();
  const previousConfigRef = useRef(deepCopy(currentItem));

  const updateCurrentItem = useCallback(
    (stateOrCallBack) => {
      setCurrentItem((prev) => {
        let next;
        if (typeof stateOrCallBack === "function") {
          next = stateOrCallBack(prev);
        } else {
          next = stateOrCallBack;
        }
        const undoTo = deepCopy(previousConfigRef.current);
        previousConfigRef.current = deepCopy(next);
        setTimeout(() => {
          pushChanges({
            doChanges: updateCurrentItem.bind(null, undoTo),
          });
        }, 0);
        updateItem(next);
        return next;
      });
    },
    [updateItem, pushChanges]
  );

  useEffect(() => {
    if (selectedItemId !== currentItem.id) return;

    const handleMessageEvent = (event) => {
      if (event.data?.source === "BREEZE" && event.data.type === "resource") {
        const { resource } = event.data;
        if (resource.type === "updateItem") {
          updateCurrentItem(resource.itemConfig);
        }
      }
    };

    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  }, [selectedItemId, currentItem.id, updateCurrentItem]);

  useEffect(() => {
    if (selectedItemId === currentItem.id) {
      setItemDetails({
        config: currentItem,
        setConfig: updateCurrentItem,
      });
    }
  }, [selectedItemId, currentItem, setItemDetails, updateCurrentItem]);

  const forceRerender = () => {
    setErrorResetKey((k) => k + 1);
  };

  const boundaryProps = {
    FallbackComponent: (props) => (
      <FallbackWithReload {...props} resetErrorBoundary={forceRerender}>
      </FallbackWithReload>
    ),
    resetKeys: [errorResetKey],
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputSave(e);
    }
  };

  const handleInputSave = (e) => {
    const newValue = e.currentTarget.value;
    updateCurrentItem((currentItem) => {
      const updatedItem = { ...currentItem, value: newValue };
      return updatedItem;
    });

    setIsEditing(false);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = (e) => {
    if (isEditing) {
      handleInputSave(e);
    }
  };

  if(currentItem.textType === "value"){
    return (
      <span
        id={currentItem.id}
        style={{ opacity, display: "inline", width: "auto", zIndex: zbase + 22 }}
        onClick={handleSelect}
        onDoubleClick={handleDoubleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        ref={(node) => drag(node)}
      >
        ${currentItem.value.label || "variable"}
      </span>
    )
  }
  return (
    <ErrorBoundary {...boundaryProps}>
      {isPreview ? (
        currentItem.value || "Empty Text"
      ) : isEditing ? (
        <input
          id={currentItem.id}
          style={{ display: "inline", width: "auto" ,zIndex: zbase + 22 }}
          type="text"
          defaultValue={currentItem.value}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          autoFocus
          onBlur={handleBlur}
          onKeyDown={handleInputKeyDown}
        />
      ) : (
        <span
          id={currentItem.id}
          style={{ opacity, display: "inline", position:"relative", width: "auto",zIndex: zbase + 22 }}
          onClick={handleSelect}
          onDoubleClick={handleDoubleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          ref={(node) => drag(node)}
        >
          {currentItem.value || "Empty Text"}
        </span>
      )}
    </ErrorBoundary>
  );
};

TextRenderer.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    textType: PropTypes.string,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
  textType: PropTypes.string,
  updateItem: PropTypes.func.isRequired,
  handleMouseOver: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  opacity: PropTypes.number.isRequired,
  drag: PropTypes.func.isRequired,
  isPreview: PropTypes.bool.isRequired,
  zbase: PropTypes.number.isRequired
};

export default TextRenderer;
