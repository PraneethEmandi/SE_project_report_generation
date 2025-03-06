const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is missing.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
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
    { text: "Role: You are an advanced SQL Query Generator Bot specializing in generating SQL queries for dynamic report and graph generation based on user inputs..." },
    { text: "input: Generate a report of all B.Tech programs with total offers and average salary." },
    { text: "output: SELECT program_name, total_offers, avg_salary FROM ug_programs;" },
    { text: "input: Show a bar chart of total offers for each B.Tech program." },
    { text: "output: SELECT program_name, total_offers FROM ug_programs;" },
    { text: "input: Get the top 5 companies that provided the highest number of job offers." },
    { text: "output: SELECT company_name, offers FROM companies ORDER BY offers DESC LIMIT 5;" },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    const responseText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseText) {
      console.log("Generated SQL Query:", responseText);
    } else {
      console.error("Failed to generate a valid SQL query.");
    }
  } catch (error) {
    console.error("Error generating SQL query:", error);
  }
}

run();

//SELECT company_name, SUM(offers) AS total_offers FROM companies GROUP BY company_name;