// const { GoogleGenerativeAI } = require("@google/generative-ai");

// async function runChatbot() {
//   const genAI = new GoogleGenerativeAI("AIzaSyCRhEHQNs5L0F1Z3A34Uh7B-TLKisarYOc"); // Replace with your API key
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//   const prompt = "Explain how AI works";
  
//   try {
//     const result = await model.generateContent(prompt);
//     console.log(result.response.text());
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// runChatbot();
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = 'AIzaSyCRhEHQNs5L0F1Z3A34Uh7B-TLKisarYOc';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const parts = [
      {text: "\"Generate an optimized SQL query that retrieves the required data based on the user's request. The user may request either a detailed report or a graph/visualization. Structure the query accordingly to ensure efficiency and relevance. Follow these guidelines:\"\n\nIdentify the Type of User Request\nIf the user requests a \"Report\":\nRetrieve all relevant columns as per the requested details.\nUse JOINs to combine tables when necessary.\nInclude appropriate WHERE conditions to filter based on user input.\nEnsure ORDER BY is used for better readability and structured presentation.\nThe query should return comprehensive data with full details.\n\nIf the user requests a \"Graph/Visualization\":\nSelect only the necessary columns required for the visualization type.\nUse aggregations (COUNT, SUM, AVG, MAX, MIN) where applicable.\nImplement GROUP BY clauses to structure the data appropriately.\nOptimize query performance by fetching minimal but essential data.\nUse appropriate date-based grouping (YEAR, MONTH) for trend-based graphs.\n\nQuery Optimization Based on Graph TypeGraph TypeSQL Query ConsiderationsBar ChartAggregate data per category (e.g., students per year, funding per department).Pie ChartFetch percentage distributions (e.g., employment sectors, dropout rates).Line GraphExtract time-series data (e.g., research publications over years).Heat MapFetch interaction trends or large-scale data patterns.Bubble ChartCompare two quantitative variables (e.g., research impact vs. number of publications).Network GraphFetch relationships (e.g., collaborations between faculty and industries).Radar ChartFetch scores across multiple performance criteria (e.g., NAAC accreditation factors).\n\nFinal Output ConsiderationsReports: Return full data tables.Graphs: Return only essential aggregated values.Performance: Optimize using indexes and filters."},
      {text: "input: Show all students who have participated in technical events, including event name and awards.(If User Requests a Report)"},
      {text: "output: SELECT s.roll_number, s.name, s.department, te.event_name, te.category, te.date, te.location, te.awards, te.approved\nFROM Student s\nJOIN TechnicalEvents te ON s.roll_number = te.student_roll_number\nWHERE te.approved = 1\nORDER BY te.date DESC;"},
      {text: "input: Generate a bar chart showing the number of students placed each year.(If User Requests a Bar Chart (Year-wise Placements))"},
      {text: "output: SELECT YEAR(i.start_date) AS placement_year, COUNT(DISTINCT i.student_roll_number) AS total_placed\nFROM Internship i\nWHERE i.approved = 1\nGROUP BY YEAR(i.start_date)\nORDER BY placement_year;"},
      {text: "input: Show a pie chart comparing students opting for higher education vs. employment.(If User Requests a Pie Chart (Employment vs. Higher Education))"},
      {text: "output: SELECT career_path, COUNT(*) AS count\nFROM (\n    SELECT 'Higher Education' AS career_path FROM ResearchPapers\n    UNION ALL\n    SELECT 'Employment' AS career_path FROM Internship WHERE approved = 1\n) AS career_data\nGROUP BY career_path;"},
      {text: "input: Show the trend of research publications over the years.(If User Requests a Line Graph (Growth of Research Publications Over Years))"},
      {text: "output: SELECT YEAR(rp.date) AS publication_year, COUNT(rp.paper_id) AS total_papers\nFROM ResearchPapers rp\nWHERE rp.approved = 1\nGROUP BY YEAR(rp.date)\nORDER BY publication_year;"},
      {text: "input: "},
      {text: "output: "},
    ];
  
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    console.log(result.response.text());
  }
  
  run();