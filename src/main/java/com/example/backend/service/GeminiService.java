package com.example.backend.service;

import org.json.JSONObject;
// import org.json.simple.JSONArray;
// import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.Collections;

@Service
public class GeminiService {

    // @Value("${gemini.api.key}") // Read API Key from environment variables
    // private String apiKey;AIzaSyCRhEHQNs5L0F1Z3A34Uh7B-TLKisarYOc
    private final String apiKey = "AIzaSyCRhEHQNs5L0F1Z3A34Uh7B-TLKisarYOc";

    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

    public String generateSQL(String userInput) {
        RestTemplate restTemplate = new RestTemplate();
        // String prompt = "You are an advanced SQL Query Generator Bot specializing in generating SQL queries for dynamic report and graph generation based on user inputs adhering to schema. Before you give a query go through the schema and adhere to strictly to the schema. Your goal is to accurately translate user instructions into optimized SQL queries for retrieving data from a structured relational database, make sure the query generated includes only tables and columns that are available in schema. User Input Expectations: Users will provide natural language instructions, specifying whether they need a report (detailed tabular data) or a graph (concise, structured data for visualization). Based on their input, generate the most appropriate SQL query. Database Schema Reference students_data Table: Stores student details Key fields: roll_number, name, department, section, FA, email, password technical_events_data Table: Stores student participation in technical events Key fields: event_id, student_roll_number, category, event_name, event_date, location, awards, description, proof, approved cultural_events_data Table: Stores student participation in cultural events Key fields: cultural_event_id, student_roll_number, category, event_name, event_date, location, awards, description, proof, approved internship_data Table: Stores student internships Key fields: internship_id, student_roll_number, company, role, description, start_date, end_date, location, stipend, offer_letter, approved placements_data Table: Stores student placements Key fields: placement_id, student_roll_number, company, location, role, ctc, description, joining_date, core, hiring_mode, offer_letter, approved research_papers Table: Stores student research papers Key fields: paper_id, student_roll_number, title, authors, affiliations, orcid_id, abstract, intro, review, methodology, result, discussion, conclusions, journal_name, volume_issue, doi, license, bibliography, approved societies_clubs Table: Stores student membership in societies/clubs Key fields: club_id, student_roll_number, category, name, membership_type, description, proof, approved sports_events Table: Stores student participation in sports events Key fields: sport_id, student_roll_number, category, participation_type, location, date, awards, description, proof, approved Each table references roll_number in students_data Query Generation Logic: Identify Intent: If the user asks for a report, retrieve all relevant columns. If the user asks for a graph, return only the necessary fields for visualization. Recognize Filters: Users may request data by year, program, salary range, company, or percentage. Ensure the query applies relevant WHERE clauses. Determine Aggregations (if applicable): If the user requests statistics like average salary trends or total placements, generate GROUP BY and AVG(), SUM(), or COUNT() functions as needed. Sort Data: If the user specifies ranking (e.g., \\\"Top 5 highest paying companies\\\"), generate ORDER BY with LIMIT.\n"
        //         +
        //         "Before you give a query go through the schema and adhere to strictly to the schema. Follow only MYSQL functions. Return only the SQL query without any markdown formatting or explanations.\n" +
        //         "Example Input: Generate a report of all students who participated in technical events with their event details.\n" +
        //         "Example Output: SELECT students_data.roll_number, students_data.name, technical_events_data.event_name, technical_events_data.event_date, technical_events_data.location FROM students_data JOIN technical_events_data ON students_data.roll_number = technical_events_data.student_roll_number;\n\n" +
        //         "Example Input: Show a bar chart of the number of students participating in each category of cultural events.\n" +
        //         "Example Output: SELECT category, COUNT(student_roll_number) FROM cultural_events_data GROUP BY category;\n\n" +
        //         "Example Input: Get the top 5 companies that provided the highest placement offers.\n" +
        //         "Example Output: SELECT company, COUNT(placement_id) AS total_offers FROM placements_data GROUP BY company ORDER BY total_offers DESC LIMIT 5;\n\n" +
        //         "User Input: " + userInput;
        String prompt = "You are an advanced SQL Query Generator Bot specializing in generating SQL queries for dynamic report and graph generation based on user inputs adhering strictly to the schema. "
                + "Before generating a query, first retrieve the schema of the relevant tables needed for the query. "
                + "Your goal is to accurately translate user instructions into optimized SQL queries for retrieving data from a structured relational database. "
                + "Make sure the generated query includes only tables and columns that are available in the schema. "
                + "User Input Expectations: Users will provide natural language instructions, specifying whether they need a report (detailed tabular data) or a graph (concise, structured data for visualization). "
                + "Based on their input, generate the most appropriate SQL query. \n\n"

                + "Step 1: Retrieve the schema of relevant tables based on the user input. "
                + "For each table, provide its structure including column names and data types.\n\n"

                + "Step 2: Generate the SQL query strictly based on the retrieved schema.\n\n"

                + "Database Schema Reference:\n"
                + "students_data Table: Stores student details\n"
                + "Key fields: roll_number, name, department, section, FA, email, password\n\n"
                + "technical_events_data Table: Stores student participation in technical events\n"
                + "Key fields: event_id, student_roll_number, category, event_name, event_date, location, awards, description, proof, approved\n\n"
                + "cultural_events_data Table: Stores student participation in cultural events\n"
                + "Key fields: cultural_event_id, student_roll_number, category, event_name, event_date, location, awards, description, proof, approved\n\n"
                + "internship_data Table: Stores student internships\n"
                + "Key fields: internship_id, student_roll_number, company, role, description, start_date, end_date, location, stipend, offer_letter, approved\n\n"
                + "placements_data Table: Stores student placements\n"
                + "Key fields: placement_id, student_roll_number, company, location, role, ctc, description, joining_date, core, hiring_mode, offer_letter, approved\n\n"
                + "research_papers Table: Stores student research papers\n"
                + "Key fields: paper_id, student_roll_number, title, authors, affiliations, orcid_id, abstract, intro, review, methodology, result, discussion, conclusions, journal_name, volume_issue, doi, license, bibliography, approved\n\n"
                + "societies_clubs Table: Stores student membership in societies/clubs\n"
                + "Key fields: club_id, student_roll_number, category, name, membership_type, description, proof, approved\n\n"
                + "sports_events Table: Stores student participation in sports events\n"
                + "Key fields: sport_id, student_roll_number, category, participation_type, location, date, awards, description, proof, approved\n\n"
                + "Each table references roll_number in students_data.\n\n"

                + "Query Generation Logic:\n"
                + "1. Identify Intent: If the user asks for a report, retrieve all relevant columns. If the user asks for a graph, return only the necessary fields for visualization.\n"
                + "2. Retrieve Table Schema: Identify which tables are required for the query and retrieve their schema before constructing the SQL query.\n"
                + "3. Recognize Filters: Users may request data by year, program, salary range, company, or percentage. Ensure the query applies relevant WHERE clauses.\n"
                + "4. Determine Aggregations (if applicable): If the user requests statistics like average salary trends or total placements, generate GROUP BY and AVG(), SUM(), or COUNT() functions as needed.\n"
                + "5. Sort Data: If the user specifies ranking (e.g., \"Top 5 highest paying companies\"), generate ORDER BY with LIMIT.\n\n"

                + "Follow only MYSQL functions. Return only the table schema followed by the SQL query without any markdown formatting or explanations.\n\n"

                + "Example Input: Generate a report of all students who participated in technical events with their event details.\n"
                + "Example Output:\n"
                + "-- Table Schema:\n"
                + "students_data(roll_number, name)\n"
                + "technical_events_data(event_name, event_date, location, student_roll_number)\n"
                + "SELECT students_data.roll_number, students_data.name, technical_events_data.event_name, technical_events_data.event_date, technical_events_data.location "
                + "FROM students_data "
                + "JOIN technical_events_data ON students_data.roll_number = technical_events_data.student_roll_number;\n\n"

                + "Example Input: Show a bar chart of the number of students participating in each category of cultural events.\n"
                + "Example Output:\n"
                + "-- Table Schema:\n"
                + "cultural_events_data(category, student_roll_number)\n"
                + "SELECT category, COUNT(student_roll_number) FROM cultural_events_data GROUP BY category;\n\n"

                + "Example Input: Get the top 5 companies that provided the highest placement offers.\n"
                + "Example Output:\n"
                + "-- Table Schema:\n"
                + "placements_data(company, placement_id)\n"
                + "SELECT company, COUNT(placement_id) AS total_offers FROM placements_data GROUP BY company ORDER BY total_offers DESC LIMIT 5;\n\n"

                + "User Input: " + userInput;


            // Create request payload
            JSONObject requestBody = new JSONObject();
            requestBody.put("contents", Collections.singletonList(Collections.singletonMap("parts",
                    Collections.singletonList(Collections.singletonMap("text", prompt)))));
            requestBody.put("generationConfig",
                    new JSONObject().put("temperature", 0).put("topP", 0.95).put("topK", 40).put("maxOutputTokens", 8192));

            // Set request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("x-goog-api-key", apiKey);

            // Send request to Gemini API
            HttpEntity<String> entity = new HttpEntity<>(requestBody.toString(), headers);
            ResponseEntity<String> response = restTemplate.exchange(GEMINI_API_URL, HttpMethod.POST, entity, String.class);

            System.out.println("Gemini API Response: " + response.getBody()); // Debugging log

            // Extract SQL query from response
            // try {
            //     JSONObject jsonResponse = new JSONObject(response.getBody());
            //     org.json.JSONArray candidates = jsonResponse.optJSONArray("candidates");

            //     if (candidates != null && candidates.length() > 0) {
            //         JSONObject firstCandidate = candidates.getJSONObject(0);
            //         org.json.JSONArray contentParts = firstCandidate.optJSONObject("content").optJSONArray("parts");

            //         if (contentParts != null && contentParts.length() > 0) {
            //             // Remove newlines and markdown characters
            //             String sqlQuery = contentParts.getJSONObject(0).optString("text", "Failed to generate SQL query.");
            //             return sqlQuery.replaceAll("```sql|```", "").trim().replace("\n", " ");
            //         }
            //     }
            // } catch (Exception e) {
            //     System.err.println("Error parsing Gemini API response: " + e.getMessage());
            // }

            // return "Failed to generate SQL query.";
            // try {
            //     JSONObject jsonResponse = new JSONObject(response.getBody());
            //     org.json.JSONArray candidates = jsonResponse.optJSONArray("candidates");
            
            //     if (candidates != null && !candidates.isEmpty()) {
            //         JSONObject firstCandidate = candidates.getJSONObject(0);
            //         JSONObject content = firstCandidate.optJSONObject("content");
            //         if (content != null) {
            //             org.json.JSONArray parts = content.optJSONArray("parts");
            //             if (parts != null && !parts.isEmpty()) {
            //                 return parts.getJSONObject(0).optString("text").trim();
            //             }
            //         }
            //     }
            // } catch (Exception e) {
            //     System.err.println("Error parsing response: " + e.getMessage());
            // }
            // return "Failed to generate SQL query.";
            try {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                org.json.JSONArray candidates = jsonResponse.optJSONArray("candidates");
            
                if (candidates != null && !candidates.isEmpty()) {
                    JSONObject firstCandidate = candidates.getJSONObject(0);
                    JSONObject content = firstCandidate.optJSONObject("content");
                    
                    if (content != null) {
                        org.json.JSONArray parts = content.optJSONArray("parts");
                        
                        if (parts != null && !parts.isEmpty()) {
                            String fullResponse = parts.getJSONObject(0).optString("text", "Failed to generate SQL query.").trim();
                            
                            // Split response into schema and SQL query
                            String[] splitParts = fullResponse.split("(?i)SELECT", 2); // Case insensitive "SELECT" split
                            
                            if (splitParts.length == 2) {
                                String tableSchema = splitParts[0].replace("-- Table Schema:", "").trim();
                                String sqlQuery = "SELECT " + splitParts[1].trim();
                                
                                // Construct a JSON response
                                JSONObject result = new JSONObject();
                                result.put("tableSchema", tableSchema);
                                result.put("sqlQuery", sqlQuery);
            
                                return result.toString();
                            }
                        }
                    }
                }
            } catch (Exception e) {
                System.err.println("Error parsing response: " + e.getMessage());
            }
            
            // Default response if parsing fails
            JSONObject errorResult = new JSONObject();
            errorResult.put("tableSchema", "Failed to extract table schema.");
            errorResult.put("sqlQuery", "Failed to extract SQL query.");
            return errorResult.toString();
            
        }

    }
