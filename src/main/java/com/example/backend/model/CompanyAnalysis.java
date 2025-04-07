package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "top_recruiters")
public class CompanyAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int value;

    // Constructors
    public CompanyAnalysis() {}

    public CompanyAnalysis(String name, int value) {
        this.name = name;
        this.value = value;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getValue() { return value; }
    public void setValue(int value) { this.value = value; }
}
