import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, Pie, Cell, ResponsiveContainer } from "recharts";

const QueryResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sqlQuery = location.state?.sqlQuery || "No query generated.";
  const queryResults = location.state?.queryResults || [];

  // Debugging: Log queryResults to ensure it's received
  console.log("Query Results:", queryResults);

  const [chartType, setChartType] = useState("bar");
  const [copied, setCopied] = useState(false);

  // Extract keys from the query results
  const keys = queryResults.length > 0 ? Object.keys(queryResults[0]) : [];
  const xKey = keys[0]; // First column as X-axis
  const yKey = keys[1]; // Second column as Y-axis

  // Handle Copy
  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true); // Update state to trigger re-render
    setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  };

  // Ensure state updates correctly
  useEffect(() => {
    console.log("Chart Type Updated:", chartType);
  }, [chartType]);

  return (
    <DashboardLayout title="Query Results & Visualization">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">{sqlQuery}</pre>

        <div className="flex justify-between mt-4">
          <Button onClick={copyToClipboard} className="bg-blue-500 hover:bg-blue-600">
            <Clipboard className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy Query"}
          </Button>
          <Button onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-600">
            Back
          </Button>
        </div>

        {/* Show Table Only If Data Exists */}
        {queryResults.length > 0 ? (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Query Results (First 5 Rows):</h3>
              <table className="w-full border-collapse border border-gray-300 mt-2">
                <thead>
                  <tr className="bg-gray-200">
                    {keys.map((key) => (
                      <th key={key} className="border border-gray-300 p-2">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {queryResults.slice(0, 5).map((row, index) => (
                    <tr key={index} className="text-center border border-gray-300">
                      {keys.map((key, idx) => (
                        <td key={idx} className="border border-gray-300 p-2">{row[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Graph Selection */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Select Graph Type:</h3>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-60">
                  <SelectValue placeholder="Choose a graph type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Graph Visualization */}
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Visualization</h3>
              <ResponsiveContainer width="100%" height={300}>
                {chartType === "bar" && (
                  <BarChart data={queryResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={yKey} fill="#8884d8" />
                  </BarChart>
                )}

                {chartType === "line" && (
                  <LineChart data={queryResults}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={yKey} stroke="#82ca9d" />
                  </LineChart>
                )}

                {chartType === "pie" && (
                  <PieChart>
                    <Pie data={queryResults} dataKey={yKey} nameKey={xKey} outerRadius={100} fill="#8884d8" label>
                      {queryResults.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE"][index % 5]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <p className="text-red-500 mt-6">No data found.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QueryResults;
