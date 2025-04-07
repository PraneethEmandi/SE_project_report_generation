package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "administration_data")
public class AdministrationData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String department;
    private Double gpa;
    private Integer placementRate;
    private Integer eventParticipation;

    // Constructors
    public AdministrationData() {}

    public AdministrationData(String department, Double gpa, Integer placementRate, Integer eventParticipation) {
        this.department = department;
        this.gpa = gpa;
        this.placementRate = placementRate;
        this.eventParticipation = eventParticipation;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public Double getGpa() { return gpa; }
    public void setGpa(Double gpa) { this.gpa = gpa; }
    public Integer getPlacementRate() { return placementRate; }
    public void setPlacementRate(Integer placementRate) { this.placementRate = placementRate; }
    public Integer getEventParticipation() { return eventParticipation; }
    public void setEventParticipation(Integer eventParticipation) { this.eventParticipation = eventParticipation; }
}

