// import React from "react";
// import Plot from "react-plotly.js";
// import { Responsive, WidthProvider } from "react-grid-layout";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const GraphComponent = ({ graphs, setGraphs }) => {
//   const handleRemoveGraph = (id) => {
//     setGraphs((prev) => prev.filter((graph) => graph.id !== id));
//   };

//   return (
//     <ResponsiveGridLayout
//       className="layout"
//       layouts={{
//         lg: graphs.map((g, index) => ({
//           i: g.id,
//           x: index * 2,
//           y: 0,
//           w: g.layout?.w || 4,
//           h: g.layout?.h || 3,
//         })),
//       }}
//       breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//       cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//       rowHeight={150}
//       draggableHandle=".drag-handle"
//       isResizable={true}
//       onLayoutChange={(layout) => {
//         setGraphs((prev) =>
//           prev.map((graph) => {
//             const updatedLayout = layout.find((l) => l.i === graph.id);
//             return updatedLayout ? { ...graph, layout: updatedLayout } : graph;
//           })
//         );
//       }}
//     >
//       {graphs.map((graph) => (
//         <div
//           key={graph.id}
//           data-grid={graph.layout}
//           className="border p-2 relative"
//         >
//           <div className="drag-handle cursor-move bg-gray-200 p-1">Drag</div>
//           <button
//             className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
//             onClick={() => handleRemoveGraph(graph.id)}
//           >
//             X
//           </button>
//           <Plot
//             className="mt-6"
//             data={
//               graph.type === "bar"
//                 ? [
//                     {
//                       x: graph.xData,
//                       y: graph.yData,
//                       type: "bar",
//                       marker: { color: graph.color },
//                     },
//                   ]
//                 : graph.type === "line"
//                 ? [
//                     {
//                       x: graph.xData,
//                       y: graph.yData,
//                       type: "scatter",
//                       mode: "lines+markers",
//                       line: { color: graph.color },
//                     },
//                   ]
//                 : [
//                     {
//                       values: graph.yData,
//                       labels: graph.xData,
//                       type: "pie",
//                       marker: { colors: graph.xData.map(() => graph.color) },
//                     },
//                   ]
//             }
//             layout={{ title: graph.title }}
//           />
//         </div>
//       ))}
//     </ResponsiveGridLayout>
//   );
// };

// export default GraphComponent;

// import React, { useState, useEffect } from "react";
// import Plot from "react-plotly.js";
// import { Responsive, WidthProvider } from "react-grid-layout";
// import { ResizableBox } from "react-resizable";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const GraphComponent = ({ graphs, setGraphs }) => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [graphWidth, setGraphWidth] = useState(800);
//   const [graphHeight, setGraphHeight] = useState(600);
//   const [extraHeight, setExtraHeight] = useState(0);
//   const [query, setQuery] = useState("");
//   const [charCount, setCharCount] = useState(0);

//   const handleQueryChange = (e) => {
//     setQuery(e.target.value);
//     setCharCount(e.target.value.length);
//   };

//   const safeQueryResults = Array.isArray(graphs) ? graphs : [];
//   const safeSelectedRows = Array.isArray(selectedRows) ? selectedRows : [];

//   const xLabels = (
//     safeSelectedRows.length > 0 ? safeSelectedRows : safeQueryResults
//   )
//     .slice(0, graphs.length)
//     .map((row) => row?.xData ?? "");

//   useEffect(() => {
//     if (xLabels.length === 0) return;

//     const maxLabelLength = Math.max(
//       ...xLabels.map((label) => label?.length ?? 0),
//       0
//     );
//     setExtraHeight(maxLabelLength > 10 ? 50 : 0);
//   }, [xLabels]);

//   const handleRemoveGraph = (id) => {
//     setGraphs((prev) => prev.filter((graph) => graph.id !== id));
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <label className="mr-2">Width:</label>
//         <input
//           type="number"
//           value={graphWidth}
//           onChange={(e) => setGraphWidth(Number(e.target.value))}
//           className="border p-1 mr-4"
//         />
//         <label className="mr-2">Height:</label>
//         <input
//           type="number"
//           value={graphHeight}
//           onChange={(e) => setGraphHeight(Number(e.target.value))}
//           className="border p-1"
//         />
//       </div>
//       <ResponsiveGridLayout
//         className="layout"
//         layouts={{
//           lg: graphs.map((g, index) => ({
//             i: g.id,
//             x: index * 2,
//             y: 0,
//             w: g.layout?.w || 4,
//             h: g.layout?.h || 3 + extraHeight / 50,
//           })),
//         }}
//         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//         cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//         rowHeight={150}
//         draggableHandle=".drag-handle"
//         isResizable={true}
//         onLayoutChange={(layout) => {
//           setGraphs((prev) =>
//             prev.map((graph) => {
//               const updatedLayout = layout.find((l) => l.i === graph.id);
//               return updatedLayout ? { ...graph, layout: updatedLayout } : graph;
//             })
//           );
//         }}
//       >
//         {graphs.map((graph) => (
//           <div
//             key={graph.id}
//             data-grid={graph.layout}
//             className="border p-2 relative"
//           >
//             <div className="drag-handle cursor-move bg-gray-200 p-1">Drag</div>
//             <button
//               className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
//               onClick={() => handleRemoveGraph(graph.id)}
//             >
//               X
//             </button>
//             <ResizableBox
//               width={graphWidth}
//               height={graphHeight + extraHeight}
//               axis="both"
//               minConstraints={[400, 300]}
//               maxConstraints={[1200, 800]}
//               onResizeStop={(event, { size }) => {
//                 setGraphWidth(size.width);
//                 setGraphHeight(size.height);
//               }}
//               className="border rounded-lg p-2 relative"
//             >
//               <Plot
//                 className="mt-2"
//                 data={
//                   graph.type === "bar"
//                     ? [
//                         {
//                           x: graph.xData,
//                           y: graph.yData,
//                           type: "bar",
//                           marker: { color: graph.color },
//                         },
//                       ]
//                     : graph.type === "line"
//                     ? [
//                         {
//                           x: graph.xData,
//                           y: graph.yData,
//                           type: "scatter",
//                           mode: "lines+markers",
//                           line: { color: graph.color },
//                         },
//                       ]
//                     : [
//                         {
//                           values: graph.yData,
//                           labels: graph.xData,
//                           type: "pie",
//                           marker: { colors: graph.xData.map(() => graph.color) },
//                         },
//                       ]
//                 }
//                 layout={{
//                   title: graph.title,
//                   width: graphWidth,
//                   height: graphHeight + extraHeight,
//                   margin: { b: 100 },
//                   xaxis: {
//                     tickangle: xLabels.length > 5 ? -45 : 0,
//                     automargin: true,
//                   },
//                   autosize: true,
//                   responsive: true,
//                   showlegend: false,
//                   displaylogo: false,
//                 }}
//               />
//             </ResizableBox>
//           </div>
//         ))}
//       </ResponsiveGridLayout>
//     </div>
//   );
// };

// export default GraphComponent;

// import React, { useState, useEffect } from "react";
// import Plot from "react-plotly.js";
// import { Responsive, WidthProvider } from "react-grid-layout";
// import { ResizableBox } from "react-resizable";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const GraphComponent = ({ graphs, setGraphs }) => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [graphWidth, setGraphWidth] = useState(800);
//   const [graphHeight, setGraphHeight] = useState(600);
//   const [extraHeight, setExtraHeight] = useState(0);
//   const [query, setQuery] = useState("");
//   const [charCount, setCharCount] = useState(0);

//   const handleQueryChange = (e) => {
//     setQuery(e.target.value);
//     setCharCount(e.target.value.length);
//   };

//   const safeQueryResults = Array.isArray(graphs) ? graphs : [];
//   const safeSelectedRows = Array.isArray(selectedRows) ? selectedRows : [];

//   const xLabels = (
//     safeSelectedRows.length > 0 ? safeSelectedRows : safeQueryResults
//   )
//     .slice(0, graphs.length)
//     .map((row) => row?.xData ?? "");

//   useEffect(() => {
//     if (xLabels.length === 0) return;

//     const maxLabelLength = Math.max(
//       ...xLabels.map((label) => label?.length ?? 0),
//       0
//     );
//     setExtraHeight(maxLabelLength > 10 ? 50 : 0);
//   }, [xLabels]);

//   const handleRemoveGraph = (id) => {
//     setGraphs((prev) => prev.filter((graph) => graph.id !== id));
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <label className="mr-2">Width:</label>
//         <input
//           type="number"
//           value={graphWidth}
//           onChange={(e) => setGraphWidth(Number(e.target.value))}
//           className="border p-1 mr-4"
//         />
//         <label className="mr-2">Height:</label>
//         <input
//           type="number"
//           value={graphHeight}
//           onChange={(e) => setGraphHeight(Number(e.target.value))}
//           className="border p-1"
//         />
//       </div>
//       <ResponsiveGridLayout
//         className="layout"
//         layouts={{
//           lg: graphs.map((g, index) => ({
//             i: g.id,
//             x: index * 2,
//             y: 0,
//             w: g.layout?.w || 4,
//             h: g.layout?.h || 3 + extraHeight / 50,
//           })),
//         }}
//         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//         cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//         rowHeight={150}
//         draggableHandle=".drag-handle"
//         isResizable={false}
//         onLayoutChange={(layout) => {
//           setGraphs((prev) =>
//             prev.map((graph) => {
//               const updatedLayout = layout.find((l) => l.i === graph.id);
//               return updatedLayout ? { ...graph, layout: updatedLayout } : graph;
//             })
//           );
//         }}
//       >
//         {graphs.map((graph) => (
//           <div key={graph.id} data-grid={graph.layout} className=" relative">
//             <ResizableBox
//               width={graphWidth}
//               height={graphHeight + extraHeight}
//               axis="both"
//               minConstraints={[400, 300]}
//               maxConstraints={[1200, 800]}
//               onResizeStop={(event, { size }) => {
//                 setGraphWidth(size.width);
//                 setGraphHeight(size.height);
//               }}
//               className="relative"
//             >
//               <div className="drag-handle cursor-move bg-gray-200 p-1 w-full text-center absolute top-0 left-0 right-0 z-10">
//                 Drag
//               </div>
//               <button
//                 className="absolute top-0.7 right-2 bg-red-500 text-white p-1 rounded z-10"
//                 onClick={() => handleRemoveGraph(graph.id)}
//               >
//                 X
//               </button>
//               <Plot
//                 className="mt-6"
//                 data={
//                   graph.type === "bar"
//                     ? [
//                         {
//                           x: graph.xData,
//                           y: graph.yData,
//                           type: "bar",
//                           marker: { color: graph.color },
//                         },
//                       ]
//                     : graph.type === "line"
//                     ? [
//                         {
//                           x: graph.xData,
//                           y: graph.yData,
//                           type: "scatter",
//                           mode: "lines+markers",
//                           line: { color: graph.color },
//                         },
//                       ]
//                     : [
//                         {
//                           values: graph.yData,
//                           labels: graph.xData,
//                           type: "pie",
//                           marker: { colors: graph.xData.map(() => graph.color) },
//                         },
//                       ]
//                 }
//                 layout={{
//                   title: graph.title,
//                   width: graphWidth,
//                   height: graphHeight + extraHeight,
//                   margin: { b: 100 },
//                   xaxis: {
//                     tickangle: xLabels.length > 5 ? -45 : 0,
//                     automargin: true,
//                   },
//                   autosize: true,
//                   responsive: true,
//                   showlegend: false,
//                   displaylogo: false,
//                 }}
//               />
//             </ResizableBox>
//           </div>
//         ))}
//       </ResponsiveGridLayout>
//     </div>
//   );
// };

// export default GraphComponent;

// import React, { useState, useEffect } from "react";
// import Plot from "react-plotly.js";
// import { Responsive, WidthProvider } from "react-grid-layout";
// import { ResizableBox } from "react-resizable";

// const ResponsiveGridLayout = WidthProvider(Responsive);

// const GraphComponent = ({ graphs, setGraphs }) => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [graphSizes, setGraphSizes] = useState(
//     graphs.reduce((acc, graph) => {
//       acc[graph.id] = { width: 800, height: 600 };
//       return acc;
//     }, {})
//   );
//   const [extraHeight, setExtraHeight] = useState({});
//   const [query, setQuery] = useState("");
//   const [charCount, setCharCount] = useState(0);

//   useEffect(() => {
//     setGraphSizes((prev) => {
//       const updatedSizes = { ...prev };
//       graphs.forEach((graph) => {
//         if (!updatedSizes[graph.id]) {
//           updatedSizes[graph.id] = { width: 800, height: 600 };
//         }
//       });
//       return updatedSizes;
//     });
//   }, [graphs]);

//   const handleQueryChange = (e) => {
//     setQuery(e.target.value);
//     setCharCount(e.target.value.length);
//   };

//   const safeQueryResults = Array.isArray(graphs) ? graphs : [];
//   const safeSelectedRows = Array.isArray(selectedRows) ? selectedRows : [];

//   const xLabels = (
//     safeSelectedRows.length > 0 ? safeSelectedRows : safeQueryResults
//   )
//     .slice(0, graphs.length)
//     .map((row) => row?.xData ?? "");

//   useEffect(() => {
//     const newExtraHeight = {};
//     graphs.forEach((graph) => {
//       const labels = graph.xData || [];
//       const maxLabelLength = Math.max(...labels.map((label) => label?.length ?? 0), 0);
//       newExtraHeight[graph.id] = maxLabelLength > 10 ? 50 : 0;
//     });
//     setExtraHeight(newExtraHeight);
//   }, [graphs]);

//   const handleRemoveGraph = (id) => {
//     setGraphs((prev) => prev.filter((graph) => graph.id !== id));
//   };

//   return (
//     <div>
//       <ResponsiveGridLayout
//         className="layout"
//         layouts={{
//           lg: graphs.map((g, index) => ({
//             i: g.id,
//             x: index * 2,
//             y: 0,
//             w: g.layout?.w || 4,
//             h: g.layout?.h || 3 + (extraHeight[g.id] || 0) / 50,
//           })),
//         }}
//         breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//         cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//         rowHeight={150}
//         draggableHandle=".drag-handle"
//         isResizable={false}
//         onLayoutChange={(layout) => {
//           setGraphs((prev) =>
//             prev.map((graph) => {
//               const updatedLayout = layout.find((l) => l.i === graph.id);
//               return updatedLayout ? { ...graph, layout: updatedLayout } : graph;
//             })
//           );
//         }}
//       >
//         {graphs.map((graph) => (
//           <div key={graph.id} data-grid={graph.layout} className="border rounded-lg p-2 relative">
//             <ResizableBox
//               width={graphSizes[graph.id]?.width}
//               height={graphSizes[graph.id]?.height + (extraHeight[graph.id] || 0)}
//               axis="both"
//               minConstraints={[400, 300]}
//               maxConstraints={[1200, 800]}
//               onResizeStop={(event, { size }) => {
//                 setGraphSizes((prev) => ({
//                   ...prev,
//                   [graph.id]: { width: size.width, height: size.height },
//                 }));
//               }}
//               className="relative"
//             >
//               <div className="drag-handle cursor-move bg-gray-200 p-1 w-full text-center absolute top-0 left-0 right-0 z-10">
//                 Drag
//               </div>
//               <button
//                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded z-10"
//                 onClick={() => handleRemoveGraph(graph.id)}
//               >
//                 X
//               </button>
//               <Plot
//                 className="mt-6"
//                 data={
//                   graph.type === "bar"
//                     ? [
//                         {
//                           x: graph.xData,
//                           y: graph.yData,
//                           type: "bar",
//                           marker: { color: graph.color },
//                         },
//                       ]
//                     : graph.type === "line"
//                     ? [
//                         {
//                           x: graph.xData,
//                           y: graph.yData,
//                           type: "scatter",
//                           mode: "lines+markers",
//                           line: { color: graph.color },
//                         },
//                       ]
//                     : [
//                         {
//                           values: graph.yData,
//                           labels: graph.xData,
//                           type: "pie",
//                           marker: { colors: graph.xData.map(() => graph.color) },
//                         },
//                       ]
//                 }
//                 layout={{
//                   title: graph.title,
//                   width: graphSizes[graph.id]?.width,
//                   height: graphSizes[graph.id]?.height + (extraHeight[graph.id] || 0),
//                   margin: { b: 100 },
//                   xaxis: {
//                     tickangle: graph.xData.length > 5 ? -45 : 0,
//                     automargin: true,
//                   },
//                   autosize: true,
//                   responsive: true,
//                   showlegend: false,
//                   displaylogo: false,
//                 }}
//               />
//             </ResizableBox>
//           </div>
//         ))}
//       </ResponsiveGridLayout>
//     </div>
//   );
// };

// export default GraphComponent;

import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Responsive, WidthProvider } from "react-grid-layout";
import { ResizableBox } from "react-resizable";
import html2canvas from "html2canvas";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GraphComponent = ({ graphs, setGraphs }) => {
  const [graphSizes, setGraphSizes] = useState(
    graphs.reduce((acc, graph) => {
      acc[graph.id] = { width: 300, height: 300 };
      return acc;
    }, {})
  );
  const [extraHeight, setExtraHeight] = useState({});

  useEffect(() => {
    setGraphSizes((prev) => {
      const updatedSizes = { ...prev };
      graphs.forEach((graph) => {
        if (!updatedSizes[graph.id]) {
          updatedSizes[graph.id] = { width: 450, height: 300 };
        }
      });
      return updatedSizes;
    });
  }, [graphs]);

  useEffect(() => {
    const newExtraHeight = {};
    graphs.forEach((graph) => {
      const labels = graph.xData || [];
      const maxLabelLength = Math.max(
        ...labels.map((label) => label?.length ?? 0),
        0
      );
      newExtraHeight[graph.id] = maxLabelLength > 10 ? 50 : 0;
    });
    setExtraHeight(newExtraHeight);
  }, [graphs]);

  const handleRemoveGraph = (id) => {
    setGraphs((prev) => prev.filter((graph) => graph.id !== id));
  };

  const downloadDashboard = () => {
    const button = document.getElementById("download-btn");
    button.style.display = "none"; // Hide the button before taking screenshot
  
    html2canvas(document.getElementById("dashboard"), { scale: 2 }).then(
      (canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "dashboard.png";
        link.click();
        
        button.style.display = "block"; // Restore the button after downloading
      }
    );
  };
  

  return (
    <div
      style={{
        // minHeight: graphs.length * 750,
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
      }}
      id="dashboard"
    >
      <button
  id="download-btn"
  onClick={downloadDashboard}
  className="bg-blue-600 text-white p-3 rounded-lg mb-4 shadow-md hover:bg-blue-700"
>
  Download Dashboard
</button>

      <ResponsiveGridLayout
        className="layout"
        layouts={{
          lg: graphs.map((g, index) => ({
            i: g.id,
            x: index * 2,
            y: 0,
            w: g.layout?.w || 4,
            h: g.layout?.h || 3 + (extraHeight[g.id] || 0) / 50,
          })),
        }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={160}
        isDraggable={true} // ✅ Ensure dragging works
        draggableHandle=".drag-handle"
        isResizable={true} // ✅ Allow resizing within grid
        onLayoutChange={(layout) => {
          console.log("Updated Layout:", layout);
          setGraphs((prev) =>
            prev.map((graph) => {
              const updatedLayout = layout.find((l) => l.i === graph.id);
              return updatedLayout
                ? { ...graph, layout: updatedLayout }
                : graph;
            })
          );
        }}
      >
        {graphs.map((graph) => (
          <div key={graph.id} data-grid={graph.layout} className="">
            <ResizableBox
              width={graphSizes[graph.id]?.width}
              height={
                graphSizes[graph.id]?.height + (extraHeight[graph.id] || 0)
              }
              axis="both"
              minConstraints={[400, 300]}
              maxConstraints={[1200, 800]}
              onResizeStop={(event, { size }) => {
                setGraphSizes((prev) => ({
                  ...prev,
                  [graph.id]: { width: size.width, height: size.height },
                }));
              }}
              className="relative"
            >
              <div className="drag-handle cursor-move bg-gray-300 p-2 w-full text-center absolute top-0 left-0 right-0 z-10 rounded-t-lg">
                Drag
              </div>
              <button
                className="absolute top-0.75 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 z-10"
                onClick={() => handleRemoveGraph(graph.id)}
              >
                ✕
              </button>
              <Plot
                className="mt-6"
                data={
                  graph.type === "bar"
                    ? [
                        {
                          x: graph.xData,
                          y: graph.yData,
                          type: "bar",
                          marker: { color: graph.color },
                        },
                      ]
                    : graph.type === "line"
                    ? [
                        {
                          x: graph.xData,
                          y: graph.yData,
                          type: "scatter",
                          mode: "lines+markers",
                          line: { color: graph.color },
                        },
                      ]
                    : [
                        {
                          values: graph.yData,
                          labels: graph.xData,
                          type: "pie",
                          // marker: { colors: graph.xData.map(() => graph.color) },
                        },
                      ]
                }
                layout={{
                  title: {
                    text: "Click Here<br>to Edit Chart Title",
                  },
                  width: graphSizes[graph.id]?.width,
                  height:
                    graphSizes[graph.id]?.height + (extraHeight[graph.id] || 0),
                  margin: { b: 100 },
                  xaxis: {
                    tickangle: graph.xData.length > 5 ? -45 : 0,
                    automargin: true,
                  },
                  autosize: true,
                  responsive: true,
                  showlegend: false,
                  displaylogo: false,
                }}
                config={{ editable: true }}
              />
            </ResizableBox>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default GraphComponent;
