import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "./styles/Dropzone.css";
import { useVisibility } from "./contexts/VisibilityContext";
import { asFrameClient } from "./postMessageBridge";
import { useCustomDrop } from "./dragndropUtils/useCustomDrop";
import { dragState } from "./dragndropUtils/dragState";
import {
  getDragHandler,
  removeDragHandler,
} from "./dragndropUtils/dragFunctionRegistry";
import { usePushChanges } from "./contexts/UndoRedoContext";

const dropzoneRegistry = new Set();

const MAX_VISIBLE = 3;
const MAX_DISTANCE = 20;

function distanceToRect(x, y, rect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.sqrt(dx * dx + dy * dy);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const DropZone = ({
  onDrop,
  children,
  isOnly,
  heirarchy = [],
  zbase = 0,
  ownerId,
}) => {
  const dropZoneRef = useRef();
  const { setHoveredItemId } = useVisibility();
  const { withGroupedChanges } = usePushChanges();
  const drop = useCustomDrop({
    onDrop: async (data) => {
      await sleep(0);
      // Case 1: If dragId is present, use registered function handler
      if (data?.dragId) {
        const fn = getDragHandler(data.dragId);
        if (fn) {
          if (data.item.origin === "renderer") {
            // Move within renderer
            withGroupedChanges(() => {
              data.item?.remove();
              fn(data.item);
            });
          } else {
            // Fresh add (sidebar → renderer using handler)
            withGroupedChanges(() => fn(data.item));
            // fn(data.item);
          }
          removeDragHandler(data.dragId);
          return;
        }
      }

      // Case 2: WIDGET — fetch widget config and call onDrop with config
      else if (data?.item.elementType === "WIDGET") {
        asFrameClient.on("widgetConfig", (config) => {
          onDrop(config);
          asFrameClient.off("widgetConfig");
        });
        console.log("Sending FETCH_CONFIG to Breeze", data.item);
        asFrameClient.sendRequest("FETCH_CONFIG", data.item);
      }
      // Case 3: Default — call onDrop directly
      else {
        if (data.origin === "renderer") {
          withGroupedChanges(() => {
            data.remove();
            onDrop(data.item);
          });
        } else {
          withGroupedChanges(() => onDrop(data.item));
          // onDrop(data.item);
        }
      }

      // Clean up dropzone visuals
      dropzoneRegistry.forEach(({ el }) => {
        el.classList.remove("visible");
        el.classList.remove("highlighted");
      });
    },

    canDrop: (data) => (data?.id ? !heirarchy.includes(data.id) : true),
  });

  // const { isDragging, item } = useDragLayer((monitor) => ({
  //   isDragging: monitor.isDragging(),
  //   item: monitor.getItem(),
  // }));
  const [isDragging, setIsDragging] = useState(dragState.get().isDragging);
  const [dragItem, setDragItem] = useState(dragState.get().data?.item ?? null);

  useEffect(() => {
    // The subscribe function returns an unsubscribe function for cleanup
    const unsubscribe = dragState.subscribe((newState) => {
      setIsDragging(newState.isDragging);
      setDragItem(newState.data?.item ?? null);
    });

    // Cleanup on unmount
    return unsubscribe;
  }, []); // Empty array ensures this runs only on mount and unmount

  useEffect(() => {
    const el = dropZoneRef.current;
    if (!el) return;

    const parent = el.parentElement;
    const computedStyle = window.getComputedStyle(parent);
    let isRow = false;

    const checkInline = (el) => {
      if (!el) return false;
      const style = window.getComputedStyle(el);
      return (
        el.classList.contains("thisIsSupposedToBeText") ||
        style.display === "inline" ||
        style.display === "inline-block"
      );
    };

    if (
      checkInline(el.previousElementSibling) &&
      checkInline(el.nextElementSibling)
    ) {
      el.style.display = "inline-block";
      el.style.minWidth = "10px";
      el.style.alignSelf = "center";
      el.style.width = "auto";
    } else {
      if (computedStyle.display === "flex") {
        isRow = computedStyle.flexDirection === "row";
      } else if (computedStyle.display === "grid") {
        isRow = computedStyle.gridAutoFlow.includes("row");
      }

      if (isRow) {
        el.classList.add("brDnd-col-drop");
        if (isOnly) {
          el.classList.add("w-100");
        }
        el.classList.remove("brDnd-row-drop");
      } else {
        el.classList.add("brDnd-row-drop");
        el.classList.remove("brDnd-col-drop");
      }
    }
  }, [isOnly, isDragging]);

  useEffect(() => {
    const el = dropZoneRef.current;
    if (!el) return;
    el.dataset.ownerId = ownerId || "";

    const entry = { el, heirarchy, ownerId };
    dropzoneRegistry.add(entry);

    return () => {
      dropzoneRegistry.delete(entry);
    };
  }, [ownerId, heirarchy]);

  useEffect(() => {
    if (!isDragging) {
      dropzoneRegistry.forEach(({ el }) => {
        el.classList.remove("visible");
        el.classList.remove("highlighted");
      });
      setHoveredItemId(null);
      return;
    }

    let animationFrame = null;
    let lastVisible = new Set();

    const handleMouseMove = (e) => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        const { clientX: cursorX, clientY: cursorY } = e;

        for (const { el } of dropzoneRegistry) {
          if (el.classList.contains("highlighted")) {
            const rect = el.getBoundingClientRect();
            if (
              cursorX >= rect.left &&
              cursorX <= rect.right &&
              cursorY >= rect.top &&
              cursorY <= rect.bottom
            ) {
              return;
            }
          }
        }

        const distances = [];
        dropzoneRegistry.forEach(({ el, heirarchy }) => {
          if (dragItem?.item?.id && heirarchy?.includes(dragItem.item.id))
            return;
          const rect = el.getBoundingClientRect();
          const dist = distanceToRect(cursorX, cursorY, rect);
          distances.push({ el, dist, rect });
        });

        distances.sort((a, b) => a.dist - b.dist);

        let threshold = MAX_DISTANCE;
        const MAX_DISTANCE_LIMIT = 2000;
        let visibleCandidates = [];

        while (threshold <= MAX_DISTANCE_LIMIT) {
          visibleCandidates = distances.filter(({ dist }) => dist <= threshold);
          if (visibleCandidates.length >= MAX_VISIBLE) break;
          threshold += 10;
        }

        const newVisible = new Set(
          visibleCandidates.slice(0, MAX_VISIBLE).map(({ el }) => el)
        );

        let bestMatch = null;
        for (const { el, rect } of distances) {
          if (
            cursorX >= rect.left &&
            cursorX <= rect.right &&
            cursorY >= rect.top &&
            cursorY <= rect.bottom
          ) {
            bestMatch = el;
            break;
          }
        }

        dropzoneRegistry.forEach(({ el }) => {
          const shouldBeVisible = newVisible.has(el);
          const wasVisible = lastVisible.has(el);

          if (shouldBeVisible && !wasVisible) {
            el.classList.add("visible");
          } else if (!shouldBeVisible && wasVisible) {
            el.classList.remove("visible");
          }
          el.classList.remove("highlighted");
        });

        if (bestMatch) {
          bestMatch.classList.add("highlighted");
          const matchOwnerId = bestMatch.dataset.ownerId;
          setHoveredItemId(matchOwnerId || null);
        } else {
          setHoveredItemId(null);
        }

        lastVisible = newVisible;
      });
    };

    window.addEventListener("dragover", handleMouseMove);
    return () => {
      window.removeEventListener("dragover", handleMouseMove);
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isDragging, ownerId, setHoveredItemId, dragItem]);

  const isMatchId = dragItem?.item?.id === ownerId;

  return (
    <div
      ref={(node) => {
        dropZoneRef.current = node;
        drop.current = node;
      }}
      style={{
        zIndex: isMatchId ? zbase + 2 : zbase + 5,
        ...(isDragging ? {} : { pointerEvents: "none" }),
      }}
      className={isOnly ? "p-2" : ""}
    >
      <div className="brDnd-dropZone">{children}</div>
    </div>
  );
};

DropZone.propTypes = {
  onDrop: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  isOnly: PropTypes.bool,
  heirarchy: PropTypes.array,
  zbase: PropTypes.number,
  ownerId: PropTypes.string,
};

export default DropZone;
