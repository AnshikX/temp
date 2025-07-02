import { React } from "react";
import { SelectDropdown } from "/src/breeze_modules/breeze_components";
import { Row } from "react-bootstrap";
const Resize = () => {
  return (
    <div
      className={"d-flex"}
      style={{ width: "702.3125px", height: "302.96875px" }}
    >
      <SelectDropdown />
      <Row style={{ width: "405.046875px", height: "233.953125px" }} />
    </div>
  );
};
export default Resize;
