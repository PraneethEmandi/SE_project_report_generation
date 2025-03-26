import React from "react";
import Plot from "react-plotly.js";

const Dashboard2: React.FC = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
      <Plot
        data={[{ x: ["A", "B", "C"], y: [10, 20, 30], type: "bar" }]}
        layout={{ title: "Bar Chart" }}
      />
      <Plot
        data={[{ x: [1, 2, 3, 4], y: [10, 15, 13, 17], type: "line" }]}
        layout={{ title: "Line Chart" }}
      />
      <Plot
        data={[
          {
            labels: ["Apple", "Banana", "Cherry"],
            values: [30, 20, 50],
            type: "pie",
          },
        ]}
        layout={{ title: "Pie Chart" }}
      />
      <Plot
        data={[
          {
            x: [1, 2, 3, 4],
            y: [10, 11, 12, 13],
            mode: "markers",
            type: "scatter",
          },
        ]}
        layout={{ title: "Scatter Plot" }}
      />
    </div>
  );
};

export default Dashboard2;
