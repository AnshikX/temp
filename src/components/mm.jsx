import { React } from "react";
const SimpleTabs = () => {
  return (
    <Tabs className={"mb-3"} defaultActiveKey={"home"} id={"simple-tabs"}>
      <Tab eventKey={"home"} title={"Home"}>
        <p>Welcome to the Home tab!</p>
      </Tab>
      <Tab eventKey={"profile"} title={"Profile"}>
        <p>This is the Profile tab content.</p>
      </Tab>
      <Tab eventKey={"contact"} title={"Contact"}>
        <p>Contact tab content goes here.</p>
      </Tab>
      <Tabs />
      <Tab title={"none"} />
    </Tabs>
  );
};
export default SimpleTabs;
