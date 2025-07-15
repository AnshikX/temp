import Container from "./Container.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { SelectionProvider } from "./contexts/SelectionContext.jsx";
import { VisibilityProvider } from "./contexts/VisibilityContext.jsx";
// import { MapProvider } from "./contexts/MapContext.jsx";
import { UndoRedoProvider } from "./contexts/UndoRedoContext.jsx";
import { MetaConfigProvider } from "./contexts/MetaConfigContext.jsx";
import CommonProvider from "../CommonProvider.jsx";

export default function DNDRoot() {
  return (
    <CommonProvider>
      <UndoRedoProvider>
        {/* <MapProvider> */}
          <MetaConfigProvider>
          <VisibilityProvider>
            <SelectionProvider>
              <DndProvider backend={HTML5Backend}>
                <Container />
              </DndProvider>
            </SelectionProvider>
          </VisibilityProvider>
          </MetaConfigProvider>
        {/* </MapProvider> */}
      </UndoRedoProvider>
    </CommonProvider>
  );
}
