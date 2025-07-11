import { React } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { getInventory } from "/src/services/Swagger Petstore - OpenAPI 3.0/store.jsx";
import { deletePet } from "/src/services/Swagger Petstore - OpenAPI 3.0/pet.jsx";
const Dtesting = () => {
  const [ListData, setListdata] = useState([]);
  const getValues = async () => {
    const response = await getInventory();
    setListdata(response);
  };
  const handleUpdate = (val) => {};
  const handleDelete = async (val) => {
    const response = await deletePet(val);
    getValues();
  };
  useEffect(() => {
    getValues();
  }, []);
  return (
    <div className={"h-100"}>
      <Row className={"h-100"}>
        <Col className={"bg-black"}>
          <Row className={"h-100"}>
            <Col>
              <div className={"h-100 bg-danger d-flex flex-column"}>
                <div className={"h-25"} />
                <div className={"h-25"} />
              </div>
            </Col>
          </Row>
        </Col>
        <Col className={"bg-body-secondary"} />
      </Row>
    </div>
  );
};
export default Dtesting;
