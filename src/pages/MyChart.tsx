import React from "react";
import Plot from "react-plotly.js";

const MyChart: React.FC = () => {
  return (
    <Plot
      data={[
        {
          x: ["A", "B", "C", "D"],
          y: [10, 15, 7, 12],
          type: "bar",
          marker: { color: "blue" },
        },
      ]}
      layout={{ title: "React Plotly Bar Chart" }}
    />
  );
};

export default MyChart;
