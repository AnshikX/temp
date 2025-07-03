import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { usePushChanges } from "./contexts/UndoRedoContext";
import { useSelectedItemId } from "./contexts/SelectionContext";
import deepCopy from "./../utils/deepcopy";
import useResizableOverlay from "./hooks/useResizableOverlay";
import { useVisibility } from "./contexts/VisibilityContext";
import ResizerHandles from "./elements/ResizerHandles";
import OverlayToolbar from "./elements/OverlayToolbar";

const OverlayBar = ({
  itemLabel,
  onDelete,
  isVisible,
  setIsHovered,
  isFirst,
  overDetails,
  item,
  updateItem,
}) => {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const overlayRef = useRef(null);
  const selectedItemId = useSelectedItemId();
  const { pushChanges } = usePushChanges();
  const { hoveredItemId } = useVisibility();
  const isHovering = hoveredItemId === item.id;

  const [currentItem, setCurrentItem] = useState(item);
  const previousConfigRef = useRef(deepCopy(currentItem));

  const updateCurrentItem = useCallback(
    (stateOrUpdater) => {
      setCurrentItem((prev) => {
        const next =
          typeof stateOrUpdater === "function"
            ? stateOrUpdater(prev)
            : stateOrUpdater;

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

  const getTargetElement = useCallback(() => {
    return (
      document.getElementById(item.id) ||
      document.querySelector(`[data-overlay-id="${item.id}"]`)
    );
  }, [item.id]);

  const getPosition = useCallback(() => {
    const el = getTargetElement();
    if (!el) return { top: 0, left: 0, width: 0, height: 0 };
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    };
  }, [getTargetElement]);

  useEffect(() => {
    let animationFrameId;

    const updatePosition = () => {
      setPos((prev) => {
        const next = getPosition();
        if (
          prev.top !== next.top ||
          prev.left !== next.left ||
          prev.width !== next.width ||
          prev.height !== next.height
        ) {
          animationFrameId = requestAnimationFrame(updatePosition);
          return next;
        }
        return prev;
      });
    };

    updatePosition();

    const el = getTargetElement();
    if (!el) {
      const observer = new MutationObserver(() => {
        const el = getTargetElement();
        if (el) updatePosition();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }

    const mutationObserver = new MutationObserver(updatePosition);
    const resizeObserver = new ResizeObserver(updatePosition);
    const intersectionObserver = new IntersectionObserver(updatePosition);

    mutationObserver.observe(el, {
      attributes: true,
      characterData: true,
      subtree: true,
      childList: true,
    });
    resizeObserver.observe(el);
    intersectionObserver.observe(el);

    const handleAnimation = () => {
      updatePosition();
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    document.body.addEventListener("animationstart", handleAnimation);
    document.body.addEventListener("animationiteration", handleAnimation);
    document.body.addEventListener("animationend", handleAnimation);
    document.body.addEventListener("transitionend", handleAnimation);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.body.removeEventListener("animationstart", handleAnimation);
      document.body.removeEventListener("animationiteration", handleAnimation);
      document.body.removeEventListener("animationend", handleAnimation);
      document.body.removeEventListener("transitionend", handleAnimation);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, [getPosition, getTargetElement, item.id, isVisible]);

  const { overrideSize, startResize } = useResizableOverlay({
    overlayRef,
    item,
    updateCurrentItem,
  });

  const overlayStyle = {
    position: "fixed",
    top: `${pos.top}px`,
    left: `${pos.left}px`,
    width:
      overrideSize.width !== null
        ? `${overrideSize.width}px`
        : `${pos.width}px`,
    height:
      overrideSize.height !== null
        ? `${overrideSize.height}px`
        : `${pos.height}px`,
    border: isHovering
      ? "2px solid red"
      : hoveredItemId && hoveredItemId !== item.id
      ? "none"
      : isVisible
      ? "2px solid #007bff"
      : "2px dashed #ccc",
    transition: "border 0.2s ease",
    zIndex: 10,
    pointerEvents: "none",
    display: pos.width === 0 || pos.height === 0 ? "none" : "block",
  };
  return createPortal(
    <>
      <div
        ref={overlayRef}
        style={overlayStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ResizerHandles
          isVisible={
            selectedItemId === item.id &&
            (item.elementType !== "TEXT" &&
              item.elementType !== "BREEZE_COMPONENT" &&
              item.elementType !== "THIRD_PARTY" &&
              item.elementType !== "COMPONENT")
          }
          pos={pos}
          startResize={startResize}
        />
      </div>

      {isVisible && (
        <OverlayToolbar
          top={pos.top}
          left={pos.left}
          label={overDetails?.label || itemLabel}
          labelSuffix={overDetails?.labelSuffix}
          onDelete={onDelete}
          isFirst={isFirst}
          onHover={setIsHovered}
        />
      )}
    </>,
    document.body
  );
};

OverlayBar.propTypes = {
  itemId: PropTypes.string.isRequired,
  itemLabel: PropTypes.string,
  onDelete: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  setIsHovered: PropTypes.func.isRequired,
  isFirst: PropTypes.bool.isRequired,
};

export default OverlayBar;
