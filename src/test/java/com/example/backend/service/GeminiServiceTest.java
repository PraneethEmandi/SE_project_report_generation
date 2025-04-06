package com.example.backend.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.json.JSONObject;

public class GeminiServiceTest {

    private RestTemplate restTemplate;
    private GeminiService geminiService;

    @BeforeEach
    public void setup() {
        restTemplate = mock(RestTemplate.class); // 🔁 Mock the dependency
        geminiService = new GeminiService(restTemplate);
    }


    @Test  //Test1
    public void testGenerateSQL_forAveragePackageByDepartment() {
        GeminiService service = new GeminiService(restTemplate);
        String userInput = "Show the average package offered to each department.";
        String sqlQuery = service.generateSQL(userInput);
    
        System.out.println("SQL for average package by department: " + sqlQuery);
    
        assertNotNull(sqlQuery);
        assertTrue(sqlQuery.toLowerCase().contains("avg"));
        assertTrue(sqlQuery.toLowerCase().contains("group by")); 
        assertTrue(sqlQuery.toLowerCase().contains("department")); 
        assertTrue(sqlQuery.toLowerCase().contains("join")); 
        assertTrue(sqlQuery.toLowerCase().contains("students_data")); 
        assertTrue(sqlQuery.toLowerCase().contains("placements_data")); 
        assertTrue(sqlQuery.toLowerCase().contains("on")); 
    }


    @Test //Test2     
    public void testGenerateSQL_returnsValidSQL() {
    GeminiService service = new GeminiService(restTemplate);
        String userInput = "Generate a report of all students who participated in technical events with their event details.";
        String sqlQuery = service.generateSQL(userInput);

        System.out.println("Generated SQL: " + sqlQuery);

        assertNotNull(sqlQuery);                        
        assertFalse(sqlQuery.isEmpty());                   
        assertTrue(sqlQuery.toLowerCase().contains("select")); 
    }



    @Test //Test3
    public void testGenerateSQL_forEventsInApril() {
        GeminiService service = new GeminiService(restTemplate);
        String userInput = "List all cultural events that happened in April.";
        String sqlQuery = service.generateSQL(userInput);

        System.out.println("SQL for events in April: " + sqlQuery);

        assertNotNull(sqlQuery);
        assertTrue(sqlQuery.toLowerCase().contains("event_date"));
        assertTrue(sqlQuery.toLowerCase().contains("from cultural_events_data"));
    }




@Test //Test4
public void testGenerateSQL_forTopPlacements() {
    GeminiService service = new GeminiService(restTemplate);
    String userInput = "Get the top 5 companies that provided the highest placement offers.";
    String sqlQuery = service.generateSQL(userInput);

    System.out.println("SQL for top placements: " + sqlQuery);
    assertNotNull(sqlQuery);
    assertTrue(sqlQuery.toLowerCase().contains("limit 5"));
    assertTrue(sqlQuery.toLowerCase().contains("placements_data"));
    assertTrue(sqlQuery.toLowerCase().contains("order by"));
}


@Test //Test 5
public void testGenerateSQL_forPlacedCountPerDept() {
    GeminiService service = new GeminiService(restTemplate);
    String userInput = "How many students are placed in each department?";
    
    String sqlQuery = service.generateSQL(userInput);
    System.out.println("SQL for placed count per department: " + sqlQuery);

    assertNotNull(sqlQuery);
    assertTrue(sqlQuery.toLowerCase().contains("group by"));
    assertTrue(sqlQuery.toLowerCase().contains("department"));
    assertTrue(sqlQuery.toLowerCase().contains("count"));
    assertTrue(sqlQuery.toLowerCase().contains("placements_data"));
}



@Test //Test 6 
public void testGenerateSQL_forSpecificRollNumber() {
    GeminiService service = new GeminiService(restTemplate);
    String userInput = "Show all placement details for student with roll number 2023CS003.";

    String sqlQuery = service.generateSQL(userInput);
    System.out.println("Generated SQL for specific student: " + sqlQuery);

    assertNotNull(sqlQuery);
    assertTrue(sqlQuery.toLowerCase().contains("2023cs003"), "Query should contain the specific roll number");
    assertTrue(sqlQuery.toLowerCase().contains("placements_data"), "Query should reference placements_data table");
}


@Test  //Test 7
public void testGenerateSQL_ClubPresidents() {
    GeminiService service = new GeminiService(restTemplate);
    String userInput = "List all students who are presidents of any club(technical, cultural, or societies).";
    String sqlQuery = service.generateSQL(userInput);

    System.out.println("Generated SQL: " + sqlQuery);

    assertNotNull(sqlQuery);
    assertTrue(sqlQuery.toLowerCase().contains("membership_type"));
    assertTrue(sqlQuery.toLowerCase().contains("'president'"));
}

@Test  //Test 8 
public void testGenerateSQL_keywordInAbstract() {
    GeminiService service = new GeminiService(restTemplate); 

    String input = "Find research papers with the keyword cancer in the abstract";
    String sql = service.generateSQL(input);

    System.out.println("Generated SQL: " + sql);

    assertNotNull(sql);
    assertTrue(sql.toLowerCase().contains("abstract"));
    assertTrue(sql.toLowerCase().contains("cancer"));
}

@Test  // Test 9
public void testGenerateSQL_TechnicalClubs() {
    String userInput = "Show all technical clubs in the college.";

    String generatedSQL = geminiService.generateSQL(userInput);
    System.out.println("Generated SQL: " + generatedSQL);

    assertNotNull(generatedSQL, "SQL should not be null");
    assertTrue(generatedSQL.toLowerCase().contains("clubs") || generatedSQL.toLowerCase().contains("societies"), "Query should reference clubs/societies");
    assertTrue(generatedSQL.toLowerCase().contains("technical"), "Query should include keyword 'technical'");
}


@Test // Test 10 
public void testGenerateSQL_StudentsInClubsAndSports() {
    String input = "List students who are in both sports events and clubs.";
    
    String sql = geminiService.generateSQL(input);
    System.out.println("Generated SQL: " + sql);

    assertNotNull(sql, "Generated SQL should not be null");

    assertTrue(sql.toLowerCase().contains("sports") || sql.toLowerCase().contains("sports_events"), "SQL should refer to sports events");
    assertTrue(sql.toLowerCase().contains("clubs") || sql.toLowerCase().contains("societies_clubs"), "SQL should refer to clubs");
}



@Test // Test 11
public void testGenerateSQLForMechanicalEngineeringPapers() {
    String input = "Show all papers by students of Mechanical Engineering Department.";

    String sql = geminiService.generateSQL(input);
    System.out.println("Generated SQL: " + sql);

    assertNotNull(sql, "Generated SQL should not be null");

    assertTrue(sql.toLowerCase().contains("research_papers"), "SQL should reference research_papers table");
    assertTrue(sql.toLowerCase().contains("mechanical"), "SQL should filter by Mechanical Engineering department");
}


@Test // Test 12
public void testGenerateSQLForHighestStipendInternship() {
    String input = "Show the company and stipend offering the highest internship stipend.";

    String sql = geminiService.generateSQL(input);
    System.out.println("Generated SQL: " + sql);

    assertNotNull(sql, "Generated SQL should not be null");

    assertTrue(sql.toLowerCase().contains("internship_data"), "SQL should reference internship_data table");
    assertTrue(sql.toLowerCase().contains("stipend"), "SQL should include 'stipend'");
    assertTrue(sql.toLowerCase().contains("company"), "SQL should include 'company'");
}


@Test // Test 13
public void testGenerateSQLForInternshipsInMay() {
    String input = "List internships starting in May";

    String sql = geminiService.generateSQL(input);
    System.out.println("Generated SQL: " + sql);

    assertNotNull(sql, "Generated SQL should not be null");
    assertTrue(sql.toLowerCase().contains("internship_data"), "SQL should reference 'internship_data' table");
    assertTrue(sql.toLowerCase().contains("month(start_date) = 5"), "SQL should filter internships starting in May");
}


@Test // Test 14
public void testGenerateSQLForTop3FirstPlaceAwardWinners() {
    String input = "Get top 3 students with the most First Place awards in technical events";

    String sql = geminiService.generateSQL(input);
    System.out.println("Generated SQL: " + sql);

    assertNotNull(sql, "Generated SQL should not be null");

    assertTrue(sql.toLowerCase().contains("technical_events_data"), "SQL should reference technical_events_data table");
    assertTrue(sql.toLowerCase().contains("first place"), "SQL should filter by 'First Place' awards");
    assertTrue(sql.toLowerCase().contains("limit 3"), "SQL should limit result to top 3 students");
}



@Test // ✅ Test 15
public void testGenerateSQLForTop2DepartmentsInCulturalAwards() {
    String input = "Find top 2 departments with the highest number of cultural event awards";

    String sql = geminiService.generateSQL(input);
    System.out.println("Generated SQL: " + sql);

    assertNotNull(sql, "Generated SQL should not be null");

    assertTrue(sql.toLowerCase().contains("cultural_events_data"), "SQL should reference cultural_events_data table");
    assertTrue(sql.toLowerCase().contains("department"), "SQL should include department field");
    assertTrue(sql.toLowerCase().contains("limit 2"), "SQL should limit result to top 2 departments");
}

}

