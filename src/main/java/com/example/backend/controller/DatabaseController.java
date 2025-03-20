package com.example.backend.controller;

import com.example.backend.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/db")
@CrossOrigin(origins = "http://localhost:8081")
public class DatabaseController {

    @Autowired
    private DatabaseService databaseService;

    @PostMapping("/run-query")
    public List<Map<String, Object>> runSQL(@RequestBody Map<String, String> request) {
        String query = request.get("query");
        return databaseService.executeQuery(query);
    }
}
