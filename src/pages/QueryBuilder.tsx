import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Plot from "react-plotly.js";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// import "jspdf-autotable";

const QueryBuilder = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showGraphOptions, setShowGraphOptions] = useState(false);
  const [graphType, setGraphType] = useState("bar");
  const [numRows, setNumRows] = useState<number>(Infinity);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [graphColor, setGraphColor] = useState("#3498db"); // Default color set to blue
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setCharCount(e.target.value.length);
  };
  const handleRowSelection = (row) => {
    setSelectedRows((prev) => {
      if (prev.includes(row)) {
        return prev.filter((r) => r !== row);
      } else {
        return [...prev, row];
      }
    });
  };

  const handleGenerateSQL = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Enter a query.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/ai/generate-sql",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInput: query }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setGeneratedSQL(data.sqlQuery);
      } else {
        throw new Error(data.message || "Failed to generate SQL.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleRunQuery = async () => {
    if (!generatedSQL) {
      toast({
        title: "No SQL Query",
        description: "Generate an SQL query first.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/db/run-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: generatedSQL }),
      });
      const data = await response.json();
      if (response.ok) {
        setQueryResults(data.slice(0, numRows));
      } else {
        throw new Error(data.message || "Failed to run SQL query.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };
  const downloadCSV = () => {
    const csv = Papa.unparse(queryResults);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "query_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(queryResults);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Query Results");
    XLSX.writeFile(workbook, "query_results.xlsx");
  };

  const downloadPDF = () => {
    if (queryResults.length === 0) {
      alert("No data available to export!");
      return;
    }
  
    const doc = new jsPDF();
    doc.text("Query Results", 10, 10);
  
    const headers = [Object.keys(queryResults[0])];
    const data = queryResults.map((row) => Object.values(row));
  
    autoTable(doc, {
      head: headers,
      body: data,
    });
  
    doc.save("query_results.pdf");
  };
  
  const databaseSchema = [
    { name: "Students Data", table: "students_data", details: "Stores student details (roll_number, name, department, section, email)." },
    { name: "Technical Events", table: "technical_events_data", details: "Student participation in tech events (event_name, category, event_date, awards)." },
    { name: "Cultural Events", table: "cultural_events_data", details: "Student participation in cultural events (event_name, category, event_date, awards)." },
    { name: "Internships", table: "internship_data", details: "Student internship details (company, role, stipend, start_date, end_date)." },
    { name: "Placements", table: "placements_data", details: "Student placement records (company, role, ctc, joining_date)." },
    { name: "Research Papers", table: "research_papers", details: "Published papers by students (title, journal_name, doi)." },
    { name: "Societies & Clubs", table: "societies_clubs", details: "Student memberships in clubs (name, membership_type)." },
    { name: "Sports Events", table: "sports_events", details: "Student sports participation (sport_name, category, awards)." }
  ];
  return (
    <DashboardLayout title="Build Your Query">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Database Schema</h2>
        <ul className="mb-4 bg-gray-100 p-4 rounded-md">
          {databaseSchema.map((table) => (
            <li key={table.table} className="mb-2">
              <strong>{table.name}:</strong> {table.details}
            </li>
          ))}
        </ul>
        <Textarea
          placeholder="e.g. Placement statistics of 5 companies"
          value={query}
          onChange={handleQueryChange}
          className="min-h-[150px] text-base"
        />
        <div className="text-right text-sm text-gray-500">{charCount}/200</div>

        <Button
          onClick={handleGenerateSQL}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-800"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate SQL"}
        </Button>
        {generatedSQL && (
          <pre className="mt-4 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap break-words">
          {generatedSQL}
        </pre>
        
        )}

        <Button
          onClick={handleRunQuery}
          className="w-full mt-4 bg-black hover:bg-gray-800"
          disabled={loading || !generatedSQL}
        >
          <Search className="mr-2 h-4 w-4" /> Run Query
        </Button>

        {queryResults.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-semibold">
      Query Results (First {numRows} Rows):
    </h3>
    <table className="w-full border-collapse border border-gray-300 mt-2">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2 text-center">Select</th> {/* Checkbox Header */}
          {Object.keys(queryResults[0]).map((key) => (
            <th key={key} className="border border-gray-300 p-2 text-left">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {queryResults.map((row, index) => (
          <tr key={index} className="border border-gray-300">
            <td className="border border-gray-300 p-2 text-center">
              <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelection(row)}
                      title="Select row"
                      aria-label="Select row"
                      placeholder="Select row"
                  />
            </td>
            {Object.values(row).map((value, idx) => (
              <td key={idx} className="border border-gray-300 p-2">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

            <div className="mt-4 flex gap-4">
              <button
                onClick={downloadCSV}
                className="p-2 bg-blue-500 text-white rounded-md"
              >
                Download CSV
              </button>
              <button
                onClick={downloadExcel}
                className="p-2 bg-green-500 text-white rounded-md"
              >
                Download Excel
              </button>
              {/* <button
                onClick={downloadPDF}
                className="p-2 bg-red-500 text-white rounded-md"
              >
                Download PDF
              </button> */}
            </div>
            <Button
              onClick={() => setShowGraphOptions(true)}
              className="w-full mt-4 bg-green-600 hover:bg-green-800"
            >
              Generate Graph
            </Button>
          </div>
        )}

        {showGraphOptions && queryResults.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Select Graph Type:</h3>
            <label htmlFor="graphType" className="block text-sm font-medium text-gray-700">
              Graph Type
            </label>
            <select
              id="graphType"
              value={graphType}
              onChange={(e) => setGraphType(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>

            <h3 className="text-lg font-semibold mt-4">Number of Rows:</h3>
            <input
              type="number"
              value={numRows}
              onChange={(e) => setNumRows(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              min="1"
              max={queryResults.length}
              placeholder="Enter number of rows"
            />

            <h3 className="text-lg font-semibold mt-4">Select Graph Color:</h3>
            <input
              type="color"
              value={graphColor}
              onChange={(e) => setGraphColor(e.target.value)}
              className="w-full p-2 border rounded-md"
            />

            {(graphType === "bar" || graphType === "line") && (
              <div className="mt-4 flex gap-4">
                <label htmlFor="xAxisSelect" className="sr-only">Select X-Axis</label>
                <select
                  id="xAxisSelect"
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  className="w-1/2 p-2 border rounded-md"
                >
                  <option value="">Select X-Axis</option>
                  {Object.keys(queryResults[0]).map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
                <select
                  id="yAxisSelect"
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  className="w-1/2 p-2 border rounded-md"
                >
                  <option value="">Select Y-Axis</option>
                  {Object.keys(queryResults[0]).map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Plot
              className="mt-6"
              data={
                graphType === "bar"
                  ? [
                      {
                        x: (selectedRows.length > 0
                          ? selectedRows
                          : queryResults
                        )
                          .slice(0, numRows)
                          .map((row) => row[xAxis]),
                        y: (selectedRows.length > 0
                          ? selectedRows
                          : queryResults
                        )
                          .slice(0, numRows)
                          .map((row) => row[yAxis]),
                        type: "bar",
                        marker: { color: graphColor },
                      },
                    ]
                  : graphType === "line"
                  ? [
                      {
                        x: (selectedRows.length > 0
                          ? selectedRows
                          : queryResults
                        )
                          .slice(0, numRows)
                          .map((row) => row[xAxis]),
                        y: (selectedRows.length > 0
                          ? selectedRows
                          : queryResults
                        )
                          .slice(0, numRows)
                          .map((row) => row[yAxis]),
                        type: "scatter",
                        mode: "lines+markers",
                        line: { color: graphColor },
                        marker: { color: graphColor },
                      },
                    ]
                  : [
                      {
                        values: (selectedRows.length > 0
                          ? selectedRows
                          : queryResults
                        )
                          .slice(0, numRows)
                          .map((row) => row[yAxis]),
                        labels: (selectedRows.length > 0
                          ? selectedRows
                          : queryResults
                        )
                          .slice(0, numRows)
                          .map((row) => row[xAxis]),
                        type: "pie",
                        marker: { colors: [graphColor] },
                      },
                    ]
              }
              layout={{ title: "Generated Graph" }}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QueryBuilder;
