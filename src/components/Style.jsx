import { React } from "react";
import { Container } from "react-bootstrap";
import { VerticalSidebar } from "/src/breeze_modules/breeze_components";
const Style = ({ styles }) => {
  const some = { name: "Abc" };
  return (
    <Container className={"mt-3"}>
      <VerticalSidebar
        title={"Menu"}
        items={[
          { id: "1", label: "Dashboard" },
          {
            id: "2",
            label: "Settings",
            children: [
              { id: "2-1", label: "Profile" },
              { id: "2-2", label: "Security" },
            ],
          },
          {
            id: "3",
            label: "Projects",
            children: [
              {
                id: "3-1",
                label: "React App",
                children: [
                  { id: "3-1-1", label: "Overview" },
                  { id: "3-1-2", label: "Code" },
                ],
              },
            ],
          },
        ]}
      />
    </Container>
  );
};
export default Style;
