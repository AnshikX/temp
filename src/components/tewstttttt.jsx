import { React } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { CardBody } from "react-bootstrap";
const Tewstttttt = () => {
  const frgbh = 0;
  return (
    <div hidden={false} id={"sa"} onClick={"ds"} onPaste={undefined}>
      <Container>
        <h3 className={"mb-4"}>Hello World</h3>
      </Container>
      <Row className={"g-4"}>
        <Col md={3}>
          <Card className={"text-center shadow-sm"}>
            <CardBody />
          </Card>
        </Col>
        <Col md={3}>
          <Card className={"shadow-sm text-center"}>
            <CardBody />
          </Card>
        </Col>
        <Col md={3}>
          <Card className={"text-center shadow-sm"}>
            <CardBody />
          </Card>
        </Col>
        <Col md={3}>
          <Card className={"shadow-sm text-center"}>
            <CardBody />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Tewstttttt;
