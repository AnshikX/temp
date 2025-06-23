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
      <div className={"row"} />
      <D />
      <div className={"col"} />
      {undefined ? (
        <></>
      ) : (
        <>
          <CalendarInput
            id={"calendar-input"}
            labelText={"Select Date:"}
            labelPosition={"left"}
            format={"dd/MM/yyyy"}
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
