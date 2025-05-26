import { React } from "react";
import { useState } from "react";
import { useEffect } from "react";
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
    <div>
      <button
        onClick={() => {}}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Create new Item
      </button>
      <table
        style={{ borderCollapse: "collapse", width: "50%", margin: "20px" }}
      >
        <thead style={{ width: "179px" }}>
          <tr>
            {["1", "2", "3"].map((item) => {
              return (
                <>
                  <th>hello</th>
                </>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {ListData.map((item) => {
            return (
              <>
                <tr key={item.id} style={{ borderColor: "#d12e2e" }}>
                  <td
                    style={{
                      border: "1px solid #999",
                      padding: "8px 12px",
                      textAlign: "center",
                      borderColor: "#000000",
                    }}
                  >
                    {item.id}
                  </td>
                  <td
                    style={{
                      border: "1px solid #999",
                      padding: "8px 12px",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{
                      border: "1px solid #999",
                      padding: "8px 12px",
                      textAlign: "center",
                    }}
                  >
                    <button
                      onClick={() => {}}
                      style={{
                        marginRight: "8px",
                        padding: "4px 8px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {}}
                      style={{
                        marginRight: "8px",
                        padding: "4px 8px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Dtesting;
