import { React } from "react";
import { Chart } from "react-chartjs-2";
const Hhhh = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
      },
    ],
  };
  return (
    <div className={"p-2"}>
      <Chart
        data={{
          labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "Votes",
              data: [12, 19, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        type={"bar"}
        style={{ width: "717.99658203125px", height: "392.98614501953125px" }}
      />
      <div
        className={"row"}
        style={{ width: "300px", height: "23.95833396911621px" }}
      />
    </div>
  );
};
export default Hhhh;
