import { React } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { HorizontalNavbar } from "/src/breeze_modules/breeze_components";
import { Card } from "react-bootstrap";
import { RadioInput } from "/src/breeze_modules/breeze_components";
import { updatePet } from "/src/services/Swagger Petstore - OpenAPI 3.0/pet.jsx";
import { createUserXML } from "/src/services/Swagger Petstore - OpenAPI 3.0/user.jsx";
import { getUserByName } from "/src/services/Swagger Petstore - OpenAPI 3.0/user.jsx";
const Del = ({ editMode }) => {
  const { id } = useParams();
  const [FormData, setFormdata] = useState({ id: 0, name: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      const response = await updatePet();
    } else {
      const response = await createUserXML();
    }
  };
  const handleFormChange = (e) => {
    setFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };
  const getValue = async () => {
    const response = await getUserByName();
    setFormdata(response);
  };
  useEffect(() => {
    getValue();
  }, []);
  return (
    <div>
      <HorizontalNavbar
        brand={"My App"}
        navItems={[
          {
            id: "home",
            label: "Homes",
          },
          {
            id: "about",
            label: "About",
          },
          {
            id: "services",
            label: "Services",
          },
          {
            id: "contact",
            label: "Contact",
          },
        ]}
      />
      Hello Worldssss
      <div style={{ width: "153px" }} />
      <Card className={"w-25"} style={{ width: "108px", maxWidth: "188px" }} />
      <RadioInput
        id={"radio-input"}
        labelPosition={"left"}
        labelText={"Select Option:"}
        labelVisibility={true}
        options={[
          {
            label: "Option 1",
            value: "option1",
          },
          {
            disabled: "false",
            label: "Option 2",
            value: "option2",
          },
          {
            label: "Option 3",
            value: "option3",
          },
        ]}
      />
    </div>
  );
};
export default Del;
