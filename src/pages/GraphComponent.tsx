import React from "react";
import Plot from "react-plotly.js";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GraphComponent = ({ graphs, setGraphs }) => {
  const handleRemoveGraph = (id) => {
    setGraphs((prev) => prev.filter((graph) => graph.id !== id));
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: graphs.map((g, index) => ({ i: g.id, x: index * 2, y: 0, w: 4, h: 3 })) }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={150}
      draggableHandle=".drag-handle"
    >
      {graphs.map((graph) => (
        <div key={graph.id} data-grid={graph.layout} className="border p-2 relative">
          <div className="drag-handle cursor-move bg-gray-200 p-1">Drag</div>
          <button
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
            onClick={() => handleRemoveGraph(graph.id)}
          >
            X
          </button>
          <Plot
            className="mt-6"
            data={
              graph.type === "bar"
                ? [{ x: graph.xData, y: graph.yData, type: "bar", marker: { color: graph.color } }]
                : graph.type === "line"
                ? [{ x: graph.xData, y: graph.yData, type: "scatter", mode: "lines+markers", line: { color: graph.color } }]
                : [{ values: graph.yData, labels: graph.xData, type: "pie", marker: { colors: [graph.color] } }]
            }
            layout={{ title: graph.title }}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default GraphComponent;
