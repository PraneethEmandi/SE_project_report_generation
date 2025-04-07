package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dashboard_data")
public class DashboardData {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String category; // e.g., "placements", "events", "gpa"
    private String name;     // e.g., "Jan", "Technical", "CS"
    private Double value;    // Count or GPA

    public DashboardData() {}

    public DashboardData(String category, String name, Double value) {
        this.category = category;
        this.name = name;
        this.value = value;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
}

