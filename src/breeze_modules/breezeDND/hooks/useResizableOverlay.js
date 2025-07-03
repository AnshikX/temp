import { useRef, useState } from "react";

export default function useResizableOverlay({
  overlayRef,
  item,
  updateCurrentItem,
}) {
  const [overrideSize, setOverrideSize] = useState({
    width: null,
    height: null,
  });
  const resizeRef = useRef(null);

  const startResize = (direction, pos) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = pos.width;
    const startHeight = pos.height;

    const onMouseMove = (moveEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes("right")) newWidth += moveEvent.clientX - startX;
      if (direction.includes("left")) newWidth -= moveEvent.clientX - startX;
      if (direction.includes("bottom")) newHeight += moveEvent.clientY - startY;
      if (direction.includes("top")) newHeight -= moveEvent.clientY - startY;

      newWidth = Math.max(10, newWidth);
      newHeight = Math.max(10, newHeight);

      resizeRef.current = { width: newWidth, height: newHeight };

      if (overlayRef.current) {
        overlayRef.current.style.width = `${newWidth}px`;
        overlayRef.current.style.height = `${newHeight}px`;
      }

      setOverrideSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      const { width, height } = resizeRef.current || {};

      const styleProps = (item.attributes?.style?.properties || []).reduce(
        (acc, p) => {
          acc[p.name] = { ...p.value };
          return acc;
        },
        {}
      );

      styleProps.width = { type: "STRING", value: `${width}px` };
      styleProps.height = { type: "STRING", value: `${height}px` };

      const updatedStyle = Object.entries(styleProps).map(([name, value]) => ({
        name,
        propertyType: "NAMED",
        value,
      }));

      updateCurrentItem({
        ...item,
        attributes: {
          ...item.attributes,
          style: {
            type: "OBJECT",
            properties: updatedStyle,
          },
        },
      });

      setOverrideSize({ width: null, height: null });
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return { overrideSize, startResize };
}
