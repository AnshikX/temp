import { React } from "react";
const Map = () => {
  const arr = ["A", "B"];
  const obj = { name: "Random" };
  return (
    <div>
      {obj.map((item) => {
        return <></>;
      })}
      <div className={"row"} key={1} />
    </div>
  );
};
export default Map;
