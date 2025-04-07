package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "department_participation")
public class DepartmentParticipation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String department;
    private int value;

    // No-argument constructor
    public DepartmentParticipation() {}

    // Parameterized constructor
    public DepartmentParticipation(String department, int value) {
        this.department = department;
        this.value = value;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
