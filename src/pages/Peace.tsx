import { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useToast } from "@/components/ui/use-toast";
import Graph from "./GraphComponent"; // Assume a Graph component for rendering charts

const ResponsiveGridLayout = WidthProvider(Responsive);

const Peace = () => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [graphs, setGraphs] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleGenerateSQL = async () => {
    if (!query.trim()) {
      toast({ title: "Empty Query", description: "Enter a query.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/ai/generate-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: query }),
      });
      const data = await response.json();
      if (response.ok) {
        setGeneratedSQL(data.sqlQuery);
      } else {
        throw new Error(data.message || "Failed to generate SQL.");
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const handleRunQuery = async () => {
    if (!generatedSQL) {
      toast({ title: "No SQL Query", description: "Generate an SQL query first.", variant: "destructive" });
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
        setQueryResults(data);
      } else {
        throw new Error(data.message || "Failed to run SQL query.");
      }
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    setLoading(false);
  };

  const addGraph = () => {
    setGraphs([...graphs, { id: Date.now(), type: "bar", color: "#3498db", layout: { x: 0, y: 0, w: 4, h: 4 } }]);
  };

  const removeGraph = (id) => {
    setGraphs(graphs.filter((graph) => graph.id !== id));
  };

  const updateGraph = (id, key, value) => {
    setGraphs(graphs.map((graph) => (graph.id === id ? { ...graph, [key]: value } : graph)));
  };

  return (
    <div>
      <button onClick={addGraph}>Add Graph</button>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: graphs.map((g) => ({ ...g.layout, i: g.id.toString() })) }}
        cols={{ lg: 12 }}
        rowHeight={30}
        width={1200}
        onLayoutChange={(layout) =>
          setGraphs(graphs.map((graph, index) => ({ ...graph, layout: layout[index] })))
        }
      >
        {graphs.map((graph) => (
          <div key={graph.id} data-grid={graph.layout}>
            <Graph
              type={graph.type}
              color={graph.color}
              data={queryResults}
              onRemove={() => removeGraph(graph.id)}
              onUpdate={(key, value) => updateGraph(graph.id, key, value)}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Peace;