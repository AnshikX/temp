import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { SelectionProvider } from "./contexts/SelectionContext.jsx";
import { VisibilityProvider } from "./contexts/VisibilityContext.jsx";
// import { MapProvider } from "./contexts/MapContext.jsx";
import { UndoRedoProvider } from "./contexts/UndoRedoContext.jsx";
import { MetaConfigProvider } from "./contexts/MetaConfigContext.jsx";
import RendererFrame from "./RendererFrame.jsx";

export default function RendererFrameClientWrapper() {
  return (
    <>
      <UndoRedoProvider renderMode="CLIENT">
        {/* <MapProvider> */}
          <MetaConfigProvider renderMode="CLIENT">
          <VisibilityProvider renderMode="CLIENT">
            <SelectionProvider renderMode="CLIENT">
              <DndProvider backend={HTML5Backend}>
                <RendererFrame />
              </DndProvider>
            </SelectionProvider>
          </VisibilityProvider>
          </MetaConfigProvider>
        {/* </MapProvider> */}
      </UndoRedoProvider>
    </>
  );
}
