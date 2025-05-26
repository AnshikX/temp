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
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label
          htmlFor={"id"}
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#333",
            fontSize: "14px",
          }}
        >
          Id :
        </label>
        <input
          id={"id"}
          name={"id"}
          required={true}
          type={"number"}
          value={FormData.id}
          onChange={handleFormChange}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        <br />
        <label
          htmlFor={"name"}
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "600",
            color: "#333",
            fontSize: "14px",
          }}
        >
          Name :
        </label>
        <input
          id={"name"}
          name={"name"}
          required={true}
          type={"text"}
          value={FormData.name}
          onChange={handleFormChange}
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <input
            type={"submit"}
            value={"Submit"}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          />
        </div>
        <br />
      </form>
    </div>
  );
};
export default Del;
