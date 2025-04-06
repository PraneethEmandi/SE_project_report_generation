package com.example.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;
import org.junit.jupiter.api.AfterEach; // Add this at the top if not already present


import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class FullQueryExecutionTest {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private DatabaseService databaseService;


    @Test
    // ✅ Test 1: Average CTC per department
    public void testExecuteAveragePackageQuery() {
        String userInput = "Show the average package offered to each department.";

        // Step 1: Generate SQL from natural language
        String sqlQuery = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sqlQuery);

   
        List<Map<String, Object>> results = databaseService.executeQuery(sqlQuery);

    
        assertNotNull(results);
        assertFalse(results.isEmpty());

        
        for (Map<String, Object> row : results) {
            assertTrue(row.containsKey("department"));
            //assertTrue(row.containsKey("average_ctc"));
            System.out.println("Result row: " + row);
        }
    }


    @Test
    // ✅ Test 2: Students who participated in technical events
    public void testGenerateTechnicalEventParticipantsQuery() {
        String userInput = "Generate a report of all students who participated in technical events with their event details.";

        // Step 1: Generate SQL from natural language
        String sqlQuery = geminiService.generateSQL(userInput);

    
        System.out.println("Generated SQL: " + sqlQuery);

        List<Map<String, Object>> results = databaseService.executeQuery(sqlQuery);

        assertNotNull(results, "Result list should not be null.");
        assertFalse(results.isEmpty(), "Result list should not be empty.");

        for (Map<String, Object> row : results) {
            assertTrue(row.containsKey("student_name") || row.containsKey("name"), "Row should contain student name.");
            assertTrue(row.containsKey("event_name") || row.containsKey("event"), "Row should contain event name.");
            System.out.println("Result row: " + row);
        }
    }


    @Test 
    // ✅ Test 3: Cultural events that took place in the month of April
    public void testSQLGenerationForCulturalEventsInApril() {    
        RestTemplate restTemplate = new RestTemplate();
        GeminiService service = new GeminiService(restTemplate);
        String userInput = "List all cultural events that happened in April.";

        // Step 1: Generate SQL from natural language
        String sqlQuery = service.generateSQL(userInput);
        System.out.println("SQL for events in April: " + sqlQuery);
        
        assertNotNull(sqlQuery, "Generated SQL should not be null");
        assertTrue(sqlQuery.toLowerCase().contains("event_date"), "SQL should include event_date for filtering");
     
        List<Map<String, Object>> results = databaseService.executeQuery(sqlQuery);
        assertNotNull(results, "Results should not be null");
        assertFalse(results.isEmpty(), "Results should not be empty");

        
        for (Map<String, Object> row : results) {
            assertTrue(row.containsKey("event_name") || row.containsKey("name"), "Row should contain event name");
            assertTrue(row.containsKey("event_date"), "Row should contain event date");
            assertTrue(row.containsKey("location"), "Row should contain event location");
            System.out.println("Result Row: " + row);
        }
    }


    @Test // ✅ Test 4: Top 5 companies with highest placement offers
    public void testQueryExecution_forTopPlacements() {
        String userInput = "Get the top 5 companies that provided the highest placement offers.";

        // Step 1: Generate SQL from natural language
        String sqlQuery = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sqlQuery);

        List<Map<String, Object>> results = databaseService.executeQuery(sqlQuery);

        assertNotNull(results, "Result list should not be null.");
        assertFalse(results.isEmpty(), "Result list should not be empty.");
        assertTrue(results.size() <= 5, "Result list should contain at most 5 rows.");

        for (Map<String, Object> row : results) {
            assertTrue(row.containsKey("company"), "Row should contain company name.");
            System.out.println("Result row: " + row);
        }
    }


    @Test
    // ✅ Test 5: Count of placed students in each department
    public void testCountPlacedStudentsPerDepartment() {
        String userInput = "How many students are placed in each department?";

        // Step 1: Generate SQL from natural language
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql); 

        List<Map<String, Object>> results = databaseService.executeQuery(sql);

        assertNotNull(results);
        assertFalse(results.isEmpty());

        for (Map<String, Object> row : results) {
            System.out.println("Row: " + row); 
            assertTrue(row.containsKey("department"));
        }
    }



    
    @Test
    // ✅ Test 6: Offers given to a specific roll number
    public void testOffersForSpecificStudent() {
        String userInput = "Show all placement details for student with roll number 2023CS003.";
    
        // Step 1: Generate SQL from natural language
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql); 
    
        List<Map<String, Object>> results = databaseService.executeQuery(sql);
       
        assertNotNull(results);
        assertFalse(results.isEmpty(), "Result list should not be empty");
    
        for (Map<String, Object> row : results) {
            System.out.println("Row: " + row); 
            assertEquals("2023CS003", row.get("student_roll_number"));
        }
    }


    @Test
    // ✅ Test 7: Full query execution for students who are presidents of clubs 
    public void testQueryExecution_ClubPresidents() {
        String userInput = "List all students who are presidents of clubs.";
    
        // Step 1: Generate SQL from natural language
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql);
    
        List<Map<String, Object>> results = databaseService.executeQuery(sql);
    
        assertNotNull(results);
        assertFalse(results.isEmpty(), "No results returned for club presidents.");
    
        for (Map<String, Object> row : results) {
            System.out.println("Row: " + row);
            assertTrue(row.containsKey("roll_number") || row.containsKey("student_roll_number"));
            assertTrue(row.containsKey("club_name"));
            Object type = row.get("membership_type");
            if (type != null) {
                assertEquals("president", type.toString().toLowerCase(), "Expected membership_type to be president");
            }
        }
    }


    @Test
    // ✅ Test 8: Execute query for keyword 'cancer' in abstract field
    public void testQueryExecution_keywordInAbstract() {
        String input = "Find research papers with the keyword cancer in the abstract";

        // Step 1: Generate SQL from natural language 
        String sql = geminiService.generateSQL(input);
        System.out.println("Generated SQL: " + sql);

        List<Map<String, Object>> results = databaseService.executeQuery(sql);

        assertNotNull(results);
        assertFalse(results.isEmpty(), "No research papers found with keyword 'cancer'.");

        for (Map<String, Object> row : results) {
            System.out.println("Row: " + row);

            String abstractText = row.get("abstract").toString().toLowerCase();
            assertTrue(abstractText.contains("cancer"), "Abstract should contain keyword 'cancer'");
        }
    }


    @Test
    // ✅ Test 9: Execute query to fetch all technical clubs in the college
    public void testQueryExecution_TechnicalClubs() {
        String userInput = "Show all technical clubs in the college.";

        // Step 1: Generate SQL from natural language 
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql);

        List<Map<String, Object>> results = databaseService.executeQuery(sql);

        assertNotNull(results, "Results should not be null");
        assertFalse(results.isEmpty(), "Technical clubs list should not be empty");

        for (Map<String, Object> row : results) {
            // Print only the name field of each club
            if (row.containsKey("name")) {
                System.out.println("- " + row.get("name"));
            } else {
                System.out.println("'name' field not found in row: " + row);
            }
        }
    }


    @Test
    // ✅ Test 10: Fetch students who are part of both sports events and clubs
    public void testQueryExecution_StudentsInClubsAndSports() {
        String userInput = "List students who are in both sports events and clubs.";

        // Step 1: Generate SQL from natural language
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql);

        List<Map<String, Object>> results = databaseService.executeQuery(sql);

        assertNotNull(results, "Result set should not be null");
        assertFalse(results.isEmpty(), "Result set should not be empty");

        for (Map<String, Object> row : results) {
            System.out.println("Row: " + row);
            assertTrue(row.containsKey("student_id") || row.containsKey("roll_number"), "Row should contain student identifier");
        }
    }

   

    @Test
        // ✅ Test 11: Fetch all research papers written by students of the Mechanical Engineering department
        public void testExecuteSqlForMechanicalEngineeringPapers() {
        String userInput = "Show all papers by students of Mechanical Engineering Department.";

        // Step 1: Generate SQL from natural language
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql);

        List<Map<String, Object>> results = databaseService.executeQuery(sql);

        assertNotNull(results, "Results should not be null");
        assertFalse(results.isEmpty(), "Results should not be empty");

        for (Map<String, Object> row : results) {
            System.out.println("Row: " + row);
            assertTrue(row.containsKey("paper_id"), "Row should contain paper_id");
            assertTrue(row.containsKey("title"), "Row should contain paper title");
        }
    }


    @Test
    // ✅ Test 12: Execute query to find the company offering the highest internship stipend
    public void testHighestStipendInternship() {
        String userInput = "Show the company and stipend offering the highest internship stipend.";

        // Step 1: Generate SQL from natural language
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql);

        List<Map<String, Object>> result = databaseService.executeQuery(sql);
        System.out.println("Query Result: " + result);

        assertFalse(result.isEmpty(), "Result should not be empty");

        Map<String, Object> topResult = result.get(0);

        System.out.println("Row data: " + topResult);

        assertTrue(topResult.containsKey("company"), "Result must contain 'company' field");
        assertTrue(topResult.containsKey("stipend"), "Result must contain 'stipend' field");
    }



    @Test 
    // ✅ Test 13: Execute query to find internships starting in May
    public void testQueryExecution_InternshipsInMay() {
        String userInput = "List internships starting in May";

        // Step 1: Generate SQL from natural language
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql);

        List<Map<String, Object>> result = databaseService.executeQuery(sql);
        System.out.println("Query Result: " + result);

        assertFalse(result.isEmpty(), "Result should not be empty");

        for (Map<String, Object> row : result) {
            assertNotNull(row.get("company"), "Each result row must contain the 'company' field");
        }
    }


    @Test 
    // ✅ Test 14: Execute query to get top 3 students with most First Place awards
    public void testQueryExecution_Top3FirstPlaceWinners() {
        String userInput = "Get top 3 students with the most First Place awards in technical events";

        // Step 1: Generate SQL from natural language 
        String sql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + sql);

        List<Map<String, Object>> result = databaseService.executeQuery(sql);
        System.out.println("Query Result: " + result);

        assertNotNull(result, "Result should not be null");
        assertFalse(result.isEmpty(), "Result should not be empty");

        for (Map<String, Object> row : result) {
            assertTrue(row.containsKey("name"), "Row must contain 'name'");
            assertTrue(row.containsKey("total_first_place_awards"), "Row must contain 'total_first_place_awards'");
        }
    }


    @Test
    // ✅ Test 15: Execute query to get top 2 departments with most cultural event awards
    void testQueryExecution_Top2DepartmentsInCulturalAwards() {
        String userInput = "Find top 2 departments with the highest number of cultural event awards";
    
        // Generate SQL from natural language
        String generatedSql = geminiService.generateSQL(userInput);
        System.out.println("Generated SQL: " + generatedSql);
    
        List<Map<String, Object>> result = databaseService.executeQuery(generatedSql);
        System.out.println("Query Result: " + result);
    
        assertNotNull(result, "Query result should not be null");
        assertFalse(result.isEmpty(), "Query result should not be empty");
    
        for (Map<String, Object> row : result) {
            System.out.println("Row: " + row);
            assertTrue(row.containsKey("department"), "Row must contain 'department'");
            //assertTrue(row.containsKey("award_count"), "Row must contain 'award_count'");
        }
    }

    @AfterEach
    public void delayAfterEachTest() throws InterruptedException {
        // Add 5 seconds delay to avoid hitting Gemini API rate limit
        Thread.sleep(5000);
    }

    








    

    

  
   
}
