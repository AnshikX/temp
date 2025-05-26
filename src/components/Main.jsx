import { React } from "react";
import { ErrorBoundary } from "react-error-boundary";
const Main = ({ prop1 }) => {
  return (
    <div>
      Hello world
      <ErrorBoundary />
    </div>
  );
};
export default Main;
