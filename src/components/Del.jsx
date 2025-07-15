import { React } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Tooltip } from "antd";
import { Button } from "antd";
import { Table } from "antd";
import { Card } from "antd";
import { Layout } from "antd";
import { Spin } from "antd";
import { Skeleton } from "antd";
import { Tag } from "antd";
import { Badge } from "antd";
import { Drawer } from "antd";
import { updatePet } from "/src/services/Swagger Petstore - OpenAPI 3.0/pet.jsx";
import { createUserXML } from "/src/services/Swagger Petstore - OpenAPI 3.0/user.jsx";
import { getUserByName } from "/src/services/Swagger Petstore - OpenAPI 3.0/user.jsx";
const Del = ({ editMode }) => {
  const { id } = useParams();
  const [FormData, setFormdata] = useState({ id: 0, name: "" });
  const arr = ["1"];
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
      {Object.keys(FormData).map((item, index) => {
        return <></>;
      })}
      <Tooltip title={"ToolYiop"}>
        <Button className={"bg-danger"}>Hello World</Button>
      </Tooltip>
      <Table
        columns={[
          {
            title: "Name",
            dataIndex: "name",
          },
        ]}
        dataSource={[
          {
            key: 1,
            name: "John",
          },
        ]}
      />
      <Card bordered={true} title={"profile"}>
        Hello World
      </Card>
      <Layout />
      <Spin size={"large"} />
      <Skeleton />
      <Tag />
      <Badge />
      <Drawer open={false} placement={"right"} title={"My drawer"} />
    </div>
  );
};
export default Del;
