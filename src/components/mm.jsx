import { React } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
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
      <div className={"row"} />
    </div>
  );
};
export default Mm;
