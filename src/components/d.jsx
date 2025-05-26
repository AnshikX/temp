import { React } from "react";
const D = () => {
  const arr = [];
  return (
    <div>
      Hello world
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
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                id
              </th>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                username
              </th>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                firstName
              </th>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                lastName
              </th>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                email
              </th>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                password
              </th>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                phone
              </th>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                userStatus
              </th>
              <th
                style={{
                  border: "1px solid #999",
                  padding: "8px 12px",
                  backgroundColor: "#f2f2f2",
                  textAlign: "center",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {arr.map((item) => {
              return (
                <>
                  <tr key={item.id}>
                    <td
                      style={{
                        border: "1px solid #999",
                        padding: "8px 12px",
                        textAlign: "center",
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
                      {item.username}
                    </td>
                    <td
                      style={{
                        border: "1px solid #999",
                        padding: "8px 12px",
                        textAlign: "center",
                      }}
                    >
                      {item.firstName}
                    </td>
                    <td
                      style={{
                        border: "1px solid #999",
                        padding: "8px 12px",
                        textAlign: "center",
                      }}
                    >
                      {item.lastName}
                    </td>
                    <td
                      style={{
                        border: "1px solid #999",
                        padding: "8px 12px",
                        textAlign: "center",
                      }}
                    >
                      {item.email}
                    </td>
                    <td
                      style={{
                        border: "1px solid #999",
                        padding: "8px 12px",
                        textAlign: "center",
                      }}
                    >
                      {item.password}
                    </td>
                    <td
                      style={{
                        border: "1px solid #999",
                        padding: "8px 12px",
                        textAlign: "center",
                      }}
                    >
                      {item.phone}
                    </td>
                    <td
                      style={{
                        border: "1px solid #999",
                        padding: "8px 12px",
                        textAlign: "center",
                      }}
                    >
                      {item.userStatus}
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
    </div>
  );
};
export default D;
