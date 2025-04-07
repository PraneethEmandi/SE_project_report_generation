package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_trends")
public class EventTrends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String month;
    private int technical;
    private int cultural;
    private int professional;

    // No-argument constructor
    public EventTrends() {}

    // Parameterized constructor
    public EventTrends(String month, int technical, int cultural, int professional) {
        this.month = month;
        this.technical = technical;
        this.cultural = cultural;
        this.professional = professional;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getTechnical() {
        return technical;
    }

    public void setTechnical(int technical) {
        this.technical = technical;
    }

    public int getCultural() {
        return cultural;
    }

    public void setCultural(int cultural) {
        this.cultural = cultural;
    }

    public int getProfessional() {
        return professional;
    }

    public void setProfessional(int professional) {
        this.professional = professional;
    }
}
