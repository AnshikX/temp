import { React } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { CalendarInput } from "/src/breeze_modules/breeze_components";
import D from "/src/components/d.jsx";
const Hhhh = () => {
  return (
    <Container className={"p-3"}>
      <Row />
      <Col />
      <div className={"row"} style={{ width: "20px" }} />
      <D />
      <div className={"col"} />
      {undefined ? (
        <></>
      ) : (
        <>
          <CalendarInput
            format={"dd/MM/yyyy"}
            id={"calendar-input"}
            labelPosition={"left"}
            labelText={"Select Date:"}
          />
        </>
      )}
      {undefined.map((item) => {
        return (
          <>
            <CalendarInput />
          </>
        );
      })}
    </Container>
  );
};
export default Hhhh;
