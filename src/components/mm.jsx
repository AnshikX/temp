import { React } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import D from "/src/components/d.jsx";
const Mm = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>Hello World</Col>
          <Col>Hello World</Col>
        </Row>
        <Row>
          <Col>Hello World</Col>
          <Col>Hello World</Col>
        </Row>
      </Container>
      <D />
      <div className={"row"} />
    </div>
  );
};
export default Mm;
