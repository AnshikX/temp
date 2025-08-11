import Main from "/src/components/Main.jsx";

import SandBox from "/src/breeze_modules/SandBox.jsx";
import DNDRoot from "/src/breeze_modules/breezeDND/DNDRoot.jsx";
import App from "./App.jsx";
import RendererFrameClientWrapper from "/src/breeze_modules/breezeDND/RendererFrameClientWrapper.jsx";

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="breeze/sandbox/*" element={<SandBox />} />
      <Route path="breeze/config-builder" element={<DNDRoot />} />
      <Route path="breeze/renderer-frame" element={<RendererFrameClientWrapper />} />
      <Route path="/" element={<App />}>
      </Route>
    </Route>,
  ),
);

export default router;
