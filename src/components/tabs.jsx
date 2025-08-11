import { React } from "react";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";
const TabsComponent = () => {
  return (
    <Tabs defaultActiveKey={"home"}>
      <Tab title={"Home"} eventKey={"home"} />
    </Tabs>
  );
};
export default TabsComponent;
