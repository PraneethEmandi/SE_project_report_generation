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
import GraphComponent from "./GraphComponent";
import { v4 as uuidv4 } from "uuid";
import { Responsive, WidthProvider } from "react-grid-layout";
// import "jspdf-autotable";

const Temp = () => {
  const [graphs, setGraphs] = useState([]);
  const ResponsiveGridLayout = WidthProvider(Responsive);
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
        console.log(queryResults);
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
  //
  const generateGraphs = (data) => {
    if (!data || data.length === 0) {
      toast({
        title: "No Data",
        description: "No data available to generate graphs.",
        variant: "destructive",
      });
      return;
    }

    if (!xAxis || !yAxis || !(xAxis in data[0]) || !(yAxis in data[0])) {
      toast({
        title: "Invalid Selection",
        description: "Make sure to select valid X and Y axes.",
        variant: "destructive",
      });
      return;
    }

    const newGraph = {
      id: uuidv4(),
      type: graphType,
      xData: data.map((row) => row[xAxis]),
      yData: data.map((row) => row[yAxis]),
      color: graphColor,
      layout: { x: 0, y: 0, w: 4, h: 4 },
      title: `${graphType} graph of ${xAxis} vs ${yAxis}`,
    };

    setGraphs((prevGraphs) => [...prevGraphs, newGraph]);
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
  const openGraphGenerator = () => {
    if (!queryResults || queryResults.length === 0) {
      toast({
        title: "No Data",
        description: "No data available to generate graphs.",
        variant: "destructive",
      });
      return;
    }

    const queryResultsString = encodeURIComponent(JSON.stringify(queryResults));
    window.open(`/graph-generator?data=${queryResultsString}`, "_blank");
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
    {
      name: "Students Data",
      table: "students_data",
      details:
        "Stores student details (roll_number, name, department, section, email).",
    },
    {
      name: "Technical Events",
      table: "technical_events_data",
      details:
        "Student participation in tech events (event_name, category, event_date, awards).",
    },
    {
      name: "Cultural Events",
      table: "cultural_events_data",
      details:
        "Student participation in cultural events (event_name, category, event_date, awards).",
    },
    {
      name: "Internships",
      table: "internship_data",
      details:
        "Student internship details (company, role, stipend, start_date, end_date).",
    },
    {
      name: "Placements",
      table: "placements_data",
      details: "Student placement records (company, role, ctc, joining_date).",
    },
    {
      name: "Research Papers",
      table: "research_papers",
      details: "Published papers by students (title, journal_name, doi).",
    },
    {
      name: "Societies & Clubs",
      table: "societies_clubs",
      details: "Student memberships in clubs (name, membership_type).",
    },
    {
      name: "Sports Events",
      table: "sports_events",
      details: "Student sports participation (sport_name, category, awards).",
    },
  ];
  const ExampleQueries = [
    {
      input:
        "Analyze the number of students placed and interning across different departments with average CTC and stipend.",
      output: `SELECT s.department,
    COUNT(DISTINCT p.student_roll_number) AS placed_students,
    AVG(p.ctc) AS average_ctc,
    COUNT(DISTINCT i.student_roll_number) AS intern_students,
    AVG(i.stipend) AS average_stipend
FROM students_data s
LEFT JOIN placements_data p ON s.roll_number = p.student_roll_number
LEFT JOIN internship_data i ON s.roll_number = i.student_roll_number
GROUP BY s.department;
;`,
      graphs: [
        "Bar Chart: Department-wise count of placed students and interns.",
        "Line Graph: Trend of average CTC and stipend per department.",
        "Pie Chart: Percentage distribution of placed vs. interned students.",
      ],
    },
    {
      input:
        "Find the participation trends and awards won in technical, cultural, and sports events by department.",
      output: `SELECT students_data.department, 
COUNT(DISTINCT technical_events_data.event_name) AS total_technical_events, 
COUNT(DISTINCT cultural_events_data.event_name) AS total_cultural_events, 
COUNT(DISTINCT sports_events.sport_name) AS total_sports_events, 
COUNT(technical_events_data.awards) + COUNT(cultural_events_data.awards) + COUNT(sports_events.awards) AS total_awards_won
FROM students_data
LEFT JOIN technical_events_data ON students_data.roll_number = technical_events_data.event_name
LEFT JOIN cultural_events_data ON students_data.roll_number = cultural_events_data.event_name
LEFT JOIN sports_events ON students_data.roll_number = sports_events.sport_name
GROUP BY students_data.department;`,
      graphs: [
        "Stacked Bar Chart: Department-wise breakdown of technical, cultural, and sports event participation.",
        "Pie Chart: Percentage of students participating in each category.",
        "Bar Chart: Comparison of event participation vs. awards won.",
      ],
    },
    {
      input:
        "Show the number of students placed and interning in different companies with highest offers.",
      output: `SELECT placements_data.company, 
COUNT(DISTINCT placements_data.company) AS total_placed_students, 
COUNT(DISTINCT internship_data.company) AS total_interns, 
AVG(placements_data.ctc) AS avg_ctc, 
AVG(internship_data.stipend) AS avg_stipend
FROM placements_data
LEFT JOIN internship_data ON placements_data.company = internship_data.company
GROUP BY placements_data.company
ORDER BY total_placed_students DESC
LIMIT 10;`,
      graphs: [
        "Bar Chart: Top 10 companies with the highest placements and internships.",
        "Line Chart: Trend of average CTC vs. stipend by company.",
        "Pie Chart: Distribution of placement offers among top companies.",
      ],
    },
    {
      input:
        "Compare student research publication trends with society/club memberships by department.",
      output: `SELECT students_data.department, 
COUNT(DISTINCT research_papers.title) AS total_research_papers, 
COUNT(DISTINCT societies_clubs.name) AS total_club_memberships, 
COUNT(DISTINCT societies_clubs.membership_type) AS total_club_types
FROM students_data
LEFT JOIN research_papers ON students_data.roll_number = research_papers.title
LEFT JOIN societies_clubs ON students_data.roll_number = societies_clubs.name
GROUP BY students_data.department;`,
      graphs: [
        "Bar Chart: Research papers published vs. club memberships by department.",
        "Pie Chart: Proportion of students involved in research vs. clubs.",
        "Line Graph: Growth of research publications over time.",
      ],
    },
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
        <h2 className="text-xl font-bold mb-4">Example Queries</h2>
<ul className="mb-4 bg-gray-100 p-4 rounded-md">
  {ExampleQueries.map((query) => (
    <li key={query.input} className="mb-6">
      <h3 className="font-bold text-lg">📝 Input:</h3>
      <p className="mb-2">{query.input}</p>

      <h3 className="font-bold text-lg">📜 Output (SQL Query):</h3>
      <pre className="p-2 bg-gray-200 rounded-md overflow-x-auto whitespace-pre-wrap break-words">
        {query.output}
      </pre>

      <h3 className="font-bold text-lg">📊 Example Dashboard:</h3>
      <ul className="list-disc ml-4">
        {query.graphs.map((graph) => (
          <li key={graph}>{graph}</li>
        ))}
      </ul>
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
                  {/* <th className="border border-gray-300 p-2 text-center">
                    Select
                  </th>{" "}
                  */}
                  {Object.keys(queryResults[0]).map((key) => (
                    <th
                      key={key}
                      className="border border-gray-300 p-2 text-left"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queryResults.map((row, index) => (
                  <tr key={index} className="border border-gray-300">
                    {/* <td className="border border-gray-300 p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={() => handleRowSelection(row)}
                        title="Select row"
                        aria-label="Select row"
                        placeholder="Select row"
                      />
                    </td> */}
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
          </div>
        )}
        <Button
          onClick={openGraphGenerator}
          className="bg-red-500 hover:bg-red-700 mt-2 mx-auto block w-full"
        > 
          Generate Dashboard
        </Button>
        {/* {graphs.length > 0 && ( */}
        {/* <div className="mt-6">
          <select
            value={graphType}
            onChange={(e) => setGraphType(e.target.value)}
            className="p-2 bg-gray-100 rounded-md"
          >
            <option value="bar">Bar Graph</option>
            <option value="line">Line Graph</option>
            <option value="pie">Pie Chart</option>
          </select>
          <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
            <option value="">Select X-Axis</option>
            {queryResults.length > 0 &&
              Object.keys(queryResults[0]).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
          </select>

          <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
            <option value="">Select Y-Axis</option>
            {queryResults.length > 0 &&
              Object.keys(queryResults[0]).map((key) => {
                console.log(yAxis); // Log inside the function body
                return (
                  <option key={key} value={key}>
                    {key}
                  </option>
                );
              })}
          </select>

          <input
            type="color"
            value={graphColor}
            onChange={(e) => setGraphColor(e.target.value)}
            className="p-2 bg-gray-100 rounded-md"
          />
          <Button
            onClick={() => generateGraphs(queryResults)}
            className="bg-green-500 hover:bg-green-700"
          >
            Generate Graph
          </Button>

          <GraphComponent graphs={graphs} setGraphs={setGraphs} />
        </div> */}
      </div>
    </DashboardLayout>
  );
};

export default Temp;
