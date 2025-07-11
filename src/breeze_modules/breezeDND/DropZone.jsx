import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useDrop, useDragLayer } from "react-dnd";
import "./styles/Dropzone.css";
import { useVisibility } from "./contexts/VisibilityContext";

const dropzoneRegistry = new Set();

// Maximum number of dropzones to show at once
const MAX_VISIBLE = 3;
// The maximum distance (in pixels) from the dropzone's edge at which it will be considered
const MAX_DISTANCE = 20; // adjust as needed

// Compute the minimal distance from a point to a rectangle
function distanceToRect(x, y, rect) {
  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);
  return Math.sqrt(dx * dx + dy * dy);
}

const ACCEPTS = ["HTML", "TEXT"];
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

  const [, drop] = useDrop(
    {
      accept: ACCEPTS,
      drop: ({ item, myOnDrop, getItem }) => {
        if (myOnDrop) myOnDrop();
        if (getItem) {
          const temp = getItem(item);
          if (temp.elementType === "WIDGET") {
            // Send to Breeze, wait for response, then call onDrop
            const widgetListener = (event) => {
              if (
                event.data?.source === "BREEZE" &&
                event.data.type === "widgetConfig"
              ) {
                onDrop(event.data.config);
                window.removeEventListener("message", widgetListener);
              }
            };

            window.addEventListener("message", widgetListener);

            window.parent.postMessage(
              {
                source: "APP",
                action: "FETCH_CONFIG",
                widgetConfig: temp,
              },
              "*"
            );
          } else {
            onDrop(temp);
          }
        } else if (item) onDrop(item);
        else console.warn("Something went wrong");

        dropzoneRegistry.forEach(({ el }) => {
          el.classList.remove("visible");
          el.classList.remove("highlighted");
        });
      },
      canDrop: ({ item }) => (item ? !heirarchy.includes(item.id) : true),
    },
    [onDrop, heirarchy]
  );

  const { isDragging, item } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
  }));

  // Apply row/col drop class based on parent's layout
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

  // Proximity logic to determine which dropzones become visible and which one is highlighted
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

      // Skip if already inside highlighted zone
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
        if (item?.item?.id && heirarchy?.includes(item.item.id)) return;
        const rect = el.getBoundingClientRect();
        const dist = distanceToRect(cursorX, cursorY, rect);
        distances.push({ el, dist, rect });
      });

        // Sort by distance (smallest first)
      distances.sort((a, b) => a.dist - b.dist);

      let threshold = MAX_DISTANCE;
        const MAX_DISTANCE_LIMIT = 2000; // Max distance to consider
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
}, [isDragging, ownerId, setHoveredItemId, item]);

  const isMatchId = item?.item?.id === ownerId;

  return (
    <div
      ref={(node) => {
        drop(node);
        dropZoneRef.current = node;
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
