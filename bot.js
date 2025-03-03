const { GoogleGenerativeAI } = require("@google/generative-ai");

async function runChatbot() {
  const genAI = new GoogleGenerativeAI("AIzaSyCRhEHQNs5L0F1Z3A34Uh7B-TLKisarYOc"); // Replace with your API key
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Explain how AI works";
  
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.error("Error:", error);
  }
}

runChatbot();