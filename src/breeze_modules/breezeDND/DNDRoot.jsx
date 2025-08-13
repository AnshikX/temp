import Container from "./Container.jsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { SelectionProvider } from "./contexts/SelectionContext.jsx";
import { VisibilityProvider } from "./contexts/VisibilityContext.jsx";
import { UndoRedoProvider } from "./contexts/UndoRedoContext.jsx";
import { MetaConfigProvider } from "./contexts/MetaConfigContext.jsx";

export default function DNDRoot() {
  return (
    <>
      <UndoRedoProvider>
        <MetaConfigProvider renderMode="HOST">
          <VisibilityProvider renderMode="HOST">
            <SelectionProvider renderMode="HOST">
              <DndProvider backend={HTML5Backend}>
                <Container />
              </DndProvider>
            </SelectionProvider>
          </VisibilityProvider>
        </MetaConfigProvider>
      </UndoRedoProvider>
    </>
  );
}
