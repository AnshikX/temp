import { React } from "react";
import { Row } from "react-bootstrap";
import { ColorInput } from "/src/breeze_modules/breeze_components";
import { Table } from "react-bootstrap";
import Col2 from "/src/components/Col2.jsx";
const Row = () => {
  return (
    <Row>
      Hello World
      <Col2 />
      <ColorInput />
      <Table className={"p-2"}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John</td>
            <td>Doe</td>
          </tr>
        </tbody>
      </Table>
    </Row>
  );
};
export default Row;
