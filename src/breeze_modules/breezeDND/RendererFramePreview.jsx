import { useEffect, useRef, useState } from "react";
import RendererPreview from "./RendererPreview";
import { asClient } from "./postMessageBridge";
// import { useMetaConfig } from "./contexts/MetaConfigContext";

export default function RendererFramePreview() {
  const config = useRef(null);
  // const { setFullMetaConfig } = useMetaConfig();
  const [compName, setCompName] = useState(null);
  const [, trigger] = useState(0);

  // Get config from Breeze Client
  useEffect(() => {
    asClient.sendRequest("componentConfig").then((newTree) => {
      console.log("Received config from Breeze Client", newTree);

      config.current = newTree.component;
      // setFullMetaConfig(newTree.fullMetaConfig);
      setCompName(newTree.componentName);
      trigger((x) => x + 1);
    });
  }, []);

  return (
    <>
      {config.current && config.current.elementType ? (
        <RendererPreview
          item={config.current}
          // metaConfig={fullMetaConfig}
          componentName={compName}
        />
      ) : (
        <p>Waiting for config...</p>
      )}
    </>
  );
}
