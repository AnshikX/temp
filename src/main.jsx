import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import router from "./Routing.jsx";
import "./index.css";
import "./stylesMaster.jsx";

createRoot(document.getElementById("root")).render(  <RouterProvider router={router} />);
