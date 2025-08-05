import { useEffect, useRef } from "react";
// Import the new reactive store
import { dragState } from "./dragState";
import { asFrameClient } from "../postMessageBridge";

export function useCustomDrop({ onDrop }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleDragOver = (e) => {
      if (!dragState.get().isDragging) return;
      e.preventDefault();
      node.classList.add("custom-drag-over");
    };

    const handleDragLeave = () => {
      node.classList.remove("custom-drag-over");
    };

    const handleDrop = (e) => {
      e.preventDefault();
      node.classList.remove("custom-drag-over");

      const data = dragState.get().data;

      if (data?.onDrop) data.onDrop();
      if (data?.item) onDrop(data.item);
      if (data?.myOnDrop) data.myOnDrop();
      else if (data?.item?.myOnDrop) {
        data.item.myOnDrop();
      }
      
      dragState.set({ data: null, isDragging: false });
    };

    const onDragStart = (payload) => {
      dragState.set({ data: payload, isDragging: true });
    };
    const onDragEnd = () => {
      dragState.set({ data: null, isDragging: false });
    };

    asFrameClient.on("drag-start", onDragStart);
    asFrameClient.on("drag-end", onDragEnd);

    node.addEventListener("dragover", handleDragOver);
    node.addEventListener("dragleave", handleDragLeave);
    node.addEventListener("drop", handleDrop);

    return () => {
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("dragleave", handleDragLeave);
      node.removeEventListener("drop", handleDrop);
      asFrameClient.off("drag-start", onDragStart);
      asFrameClient.off("drag-end", onDragEnd);
    };
  }, [onDrop]);

  return ref;
}