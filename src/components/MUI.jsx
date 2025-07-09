import { React } from "react";
import { Grid } from "@mui/material";
import { Select } from "@mui/material";
import { Avatar } from "@mui/material";
const Mui = () => {
  return (
    <div>
      Hello world
      <Grid />
      <Select />
      <Avatar />
      {[1, 2, 3].map((item, index) => {
        return <>Hello World</>;
      })}
    </div>
  );
};
export default Mui;
