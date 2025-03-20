package com.example.backend.service;

import org.json.JSONObject;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Collections;

@Service
public class GeminiService {

    // @Value("${gemini.api.key}") // Read API Key from environment variables
    // private String apiKey;
    private final String apiKey = "AIzaSyCRhEHQNs5L0F1Z3A34Uh7B-TLKisarYOc";

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

    public String generateSQL(String userInput) {
        RestTemplate restTemplate = new RestTemplate();

        // Define the AI prompt
        String prompt = "You are an advanced SQL Query Generator Bot specializing in generating SQL queries for dynamic report and graph generation based on user inputs. Your goal is to accurately translate user instructions into optimized SQL queries for retrieving data from a structured relational database. User Input Expectations: Users will provide natural language instructions, specifying whether they need a report (detailed tabular data) or a graph (concise, structured data for visualization). Based on their input, generate the most appropriate SQL query. Database Schema Reference ug_programs Table: Stores B.Tech program placement details Key fields: program_name, total_offers, total_registered, percentage, min_salary, max_salary, avg_salary companies Table: Stores placement company details Key fields: company_name, offers Query Generation Logic: Identify Intent: If the user asks for a report, retrieve all relevant columns. If the user asks for a graph, return only the necessary fields for visualization. Recognize Filters: Users may request data by year, program, salary range, company, or percentage. Ensure the query applies relevant WHERE clauses. Determine Aggregations (if applicable): If the user requests statistics like average salary trends or total placements, generate GROUP BY and AVG(), SUM(), or COUNT() functions as needed. Sort Data: If the user specifies ranking (e.g., \\\"Top 5 highest paying companies\\\"), generate ORDER BY with LIMIT.\n"
                +
                "Return only the SQL query without any markdown formatting or explanations.\n" +
                "Example Input: Generate a report of all B.Tech programs with total offers and average salary.\n" +
                "Example Output: SELECT program_name, total_offers, avg_salary FROM ug_programs;\n\n" +
                "Example Input: Show a bar chart of total offers for each B.Tech program.\n" +
                "Example Output: SELECT program_name, total_offers FROM ug_programs;\n\n" +
                "Example Input: Get the top 5 companies that provided the highest number of job offers.\n" +
                "Example Output: SELECT company_name, offers FROM companies ORDER BY offers DESC LIMIT 5;\n\n" +
                "User Input: " + userInput;

        // Create request payload
        JSONObject requestBody = new JSONObject();
        requestBody.put("contents", Collections.singletonList(Collections.singletonMap("parts",
                Collections.singletonList(Collections.singletonMap("text", prompt)))));
        requestBody.put("generationConfig",
                new JSONObject().put("temperature", 1).put("topP", 0.95).put("topK", 40).put("maxOutputTokens", 8192));

        // Set request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-goog-api-key", apiKey);

        // Send request to Gemini API
        HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
        ResponseEntity<String> response = restTemplate.exchange(GEMINI_API_URL, HttpMethod.POST, entity, String.class);

        System.out.println("Gemini API Response: " + response.getBody()); // Debugging log

        // Extract SQL query from response
        try {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            org.json.JSONArray candidates = jsonResponse.optJSONArray("candidates");

            if (candidates != null && candidates.length() > 0) {
                JSONObject firstCandidate = candidates.getJSONObject(0);
                org.json.JSONArray contentParts = firstCandidate.optJSONObject("content").optJSONArray("parts");

                if (contentParts != null && contentParts.length() > 0) {
                    // Remove newlines and markdown characters
                    String sqlQuery = contentParts.getJSONObject(0).optString("text", "Failed to generate SQL query.");
                    return sqlQuery.replaceAll("```sql|```", "").trim().replace("\n", " ");
                }
            }
        } catch (Exception e) {
            System.err.println("Error parsing Gemini API response: " + e.getMessage());
        }

        return "Failed to generate SQL query.";
    }

}
