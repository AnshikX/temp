import { React } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
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
      {undefined.map((item) => {
        return <></>;
      })}
    </div>
  );
};
export default Del;
