import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
// Import the new reactive store
import { dragState } from "./dragState";
import { registerDragHandler, removeDragHandler } from "./dragFunctionRegistry";
import { asFrameHost } from "../postMessageBridge";

export const useCustomDrag = ({
  item,
  onDrop,
  canDrag = () => true,
  mode = "same-frame",
}) => {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragIdRef = useRef(null);

  const dragStart = useCallback(
    (e) => {
      if (!canDrag()) return e.preventDefault();
      e.stopPropagation();

      const dragId = uuidv4();
      dragIdRef.current = dragId;
      registerDragHandler(dragId, onDrop);
      const payload = { dragId, item };

      if (mode === "same-frame") {
        dragState.set({ data: payload, isDragging: true });
      } else if (mode === "cross-frame") {
        asFrameHost.sendEvent("drag-start", payload);
      }

      setIsDragging(true);
    },
    [item, onDrop, canDrag, mode]
  );

  const dragEnd = useCallback(() => {
    const dragId = dragIdRef.current;
    if (dragId) {
      removeDragHandler(dragId);
    }

    if (mode === "same-frame") {
        // ✅ Use the new setter to notify listeners
      dragState.set({ data: null, isDragging: false });
    } else if (mode === "cross-frame") {
      asFrameHost.sendEvent("drag-end", {});
    }

    setIsDragging(false);
  }, [mode]);

  // ... (The rest of your hook remains the same)
  const drag = useCallback(
    (node) => {
      if (!node) return;
      node.setAttribute("draggable", true);
      node.addEventListener("dragstart", dragStart);
      node.addEventListener("dragend", dragEnd);
      ref.current = node;
    },
    [dragStart, dragEnd]
  );

  useEffect(() => {
    return () => {
      const node = ref.current;
      if (node) {
        node.removeEventListener("dragstart", dragStart);
        node.removeEventListener("dragend", dragEnd);
      }
    };
  }, [dragStart, dragEnd]);
   useEffect(() => {
    // Fallback drag-end handler for same-frame and cross-frame
    const handleWindowDragEnd = () => {
      dragEnd();
    };

    const handleWindowMouseUp = () => {
      // Covers edge case when dragend never fires (e.g., dropped outside)
      if (isDragging) dragEnd();
    };

    window.addEventListener("dragend", handleWindowDragEnd);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("dragend", handleWindowDragEnd);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [dragEnd, isDragging]);

  return [{ isDragging }, drag];
};