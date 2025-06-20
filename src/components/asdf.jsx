import { React } from "react";
import { CardText } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { CardImg } from "react-bootstrap";
import { CardBody } from "react-bootstrap";
import { CardTitle } from "react-bootstrap";
const Asdf = () => {
  return (
    <div className={"mt-4"}>
      <CardText>Some quick example text to build on the card title.</CardText>
      <Container>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardImg
                  src={
                    "https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png"
                  }
                  variant={"top"}
                />
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody />
                <CardTitle>Card Title</CardTitle>
                <CardBody>
                  <CardTitle>Card Title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title.
                  </CardText>
                </CardBody>
                <CardBody>
                  <CardTitle>
                    Card Title
                    <CardImg
                      src={
                        "https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png"
                      }
                      variant={"top"}
                    />
                  </CardTitle>
                  <CardText>
                    Some quick example text to build on the card title.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardImg
                  src={
                    "https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png"
                  }
                  variant={"top"}
                />
                <CardBody>
                  <CardTitle>Card Title</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title.
                  </CardText>
                </CardBody>
                <CardImg
                  src={
                    "https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png"
                  }
                  variant={"top"}
                />
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
      <Col>
        <Card />
      </Col>
      <Col />
    </div>
  );
};
export default Asdf;
