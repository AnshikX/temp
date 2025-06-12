import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Main = () => {
  const ref = useRef();

  return (
    <>
      <div ref={ref} style={{ display: "contents" }} id="contents">
        <div className="bg-dark" style={{ height: "200px" }}></div>
      </div>
      <Portal parentRef={ref} />
    </>
  );
};

const Portal = ({ parentRef }) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  useLayoutEffect(() => {
    const child = parentRef.current?.firstElementChild;
    if (ref.current && child) {
      const rect = child.getBoundingClientRect();
      setStyle({
        position: "absolute",
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
        background: "rgba(255, 0, 0, 0.5)", // to visualize overlay
        pointerEvents: "none", // so it doesn't block clicks
      });
    }
  }, [parentRef]);

  return createPortal(
    <div ref={ref} style={style}>

    </div>,
    document.body // Prefer document.body for absolute overlays
  );
};
export default Main;
