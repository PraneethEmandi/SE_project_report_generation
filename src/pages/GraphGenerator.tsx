import { useState } from "react";
import { Button } from "@/components/ui/button";
import GraphComponent from "./GraphComponent";
import { useSearchParams } from "react-router-dom";

const GraphGenerator = ({ queryResults }: { queryResults: any[] }) => {
  const [graphType, setGraphType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [graphColor, setGraphColor] = useState("#3498db");
  const [graphs, setGraphs] = useState([]);
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get("data");

  try {
    if (dataParam) {
      queryResults = JSON.parse(decodeURIComponent(dataParam));
    }
  } catch (error) {
    console.error("Error parsing queryResults:", error);
  }

  if (!queryResults.length) {
    return <p className="text-center text-gray-500 mt-4">No data available to generate graphs.</p>;
  }

  const generateGraphs = () => {
    if (!xAxis || !yAxis || !(xAxis in queryResults[0]) || !(yAxis in queryResults[0])) {
      alert("Invalid X or Y axis selection.");
      return;
    }

    const newGraph = {
      id: Math.random().toString(36).substr(2, 9),
      type: graphType,
      xData: queryResults.map((row) => row[xAxis]),
      yData: queryResults.map((row) => row[yAxis]),
      color: graphColor,
      title: `${graphType} graph of ${xAxis} vs ${yAxis}`,
    };

    setGraphs((prevGraphs) => [...prevGraphs, newGraph]);
  };

  return (
    <div className="max-w-100% mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Graph Generator</h1>
      <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
        <select
          value={graphType}
          onChange={(e) => setGraphType(e.target.value)}
          className="p-2 bg-gray-100 rounded-md border"
        >
          <option value="bar">Bar Graph</option>
          <option value="line">Line Graph</option>
          <option value="pie">Pie Chart</option>
        </select>

        <select
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
          className="p-2 bg-gray-100 rounded-md border"
        >
          <option value="">Select X-Axis</option>
          {queryResults.length > 0 &&
            Object.keys(queryResults[0]).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
        </select>

        <select
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
          className="p-2 bg-gray-100 rounded-md border"
        >
          <option value="">Select Y-Axis</option>
          {queryResults.length > 0 &&
            Object.keys(queryResults[0]).map((key) => (
              <option key={key} value={key}>{key}</option>
            ))}
        </select>

        <input
          type="color"
          value={graphColor}
          onChange={(e) => setGraphColor(e.target.value)}
          className="w-10 h-10 border rounded-full cursor-pointer"
        />
      </div>

      <div className="text-center">
        <Button onClick={generateGraphs} className="bg-green-500 hover:bg-green-700 px-6 py-2 rounded-lg text-white font-semibold">
          Generate Graph
        </Button>
      </div>

      <div className="mt-6">
        <GraphComponent graphs={graphs} setGraphs={setGraphs} />
      </div>
    </div>
  );
};

export default GraphGenerator;