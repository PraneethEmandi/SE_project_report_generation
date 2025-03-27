package com.example.backend.controller;

import com.example.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.json.JSONObject; // Import JSON processing library

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:8081") // Allow frontend to access this backend
public class QueryController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/generate-sql")
    public Map<String, String> generateSQL(@RequestBody Map<String, String> request) {
        String userInput = request.get("userInput");
        String aiResponse = geminiService.generateSQL(userInput);

        try {
            // Convert string to JSON object
            JSONObject jsonResponse = new JSONObject(aiResponse);

            // Extract table schema and SQL query separately
            String sqlQuery = jsonResponse.optString("sqlQuery", "Failed to generate SQL query.");
            String tableSchema = jsonResponse.optString("tableSchema", "Failed to extract table schema.");

            // Return structured response
            Map<String, String> response = new HashMap<>();
            response.put("sqlQuery", sqlQuery);
            response.put("tableSchema", tableSchema);
            return response;

        } catch (Exception e) {
            // Handle JSON parsing errors
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid response format from AI service.");
            return errorResponse;
        }
    }
}
