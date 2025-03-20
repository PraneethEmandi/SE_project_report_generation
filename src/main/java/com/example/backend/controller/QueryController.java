package com.example.backend.controller;

import com.example.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        String sqlQuery = geminiService.generateSQL(userInput);

        Map<String, String> response = new HashMap<>();
        response.put("sqlQuery", sqlQuery);
        return response;
    }
}
