import { useEffect, useRef, useState } from "react";
import Renderer from "./Renderer";
import { asFrameClient } from "./postMessageBridge";  

export default function RendererFrame() {
  const config = useRef(null);
  const [, trigger] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  // const { setSelectedItemId } = useSetters();

  const updateItem = (newTree) => {
    config.current = newTree;
    trigger((x) => x + 1);
    asFrameClient.sendRequest("UPDATE_CUSTOM_CONFIG", { newTree });
  };

  useEffect(() => {
    const handleTogglePreview = () => {
      setIsPreview(!isPreview);
    };

    asFrameClient.on("TOGGLE_PREVIEW", handleTogglePreview);
    asFrameClient.on("RESET_PREVIEW", handleTogglePreview);
  }, [isPreview]);
  console.log(config.current);

  useEffect(() => {
    asFrameClient.sendRequest("config").then((newTree) => {
      config.current = newTree;
      trigger((x) => x + 1);
    });
  }, []);

  useEffect(() => {
    asFrameClient.on("UPDATED_CONFIG", ({ config: newTree }) => {
      config.current = newTree;
      trigger((x) => x + 1);
    });
  }, []);

  return (
    <>
      {config.current && config.current.elementType ? (
        <Renderer
          item={config.current}
          heirarchy={[config.current.id]}
          isPreview={isPreview}
          updateItem={updateItem}
        />
      ) : (
        <p>Waiting for config...</p>
      )}
    </>
  );
}
