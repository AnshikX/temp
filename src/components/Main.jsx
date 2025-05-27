import { React } from "react";
import { Form } from "react-bootstrap";
const Main = ({ prop1 }) => {
  return <div>Hello world
    <input/>
    <Form.Control type="email" placeholder="Enter email" />
  </div>;
};
export default Main;
