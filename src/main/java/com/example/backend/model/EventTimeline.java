package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "event_timeline")
public class EventTimeline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String date;
    private String type;
    private String name;

    // No-argument constructor
    public EventTimeline() {}

    // Parameterized constructor
    public EventTimeline(String date, String type, String name) {
        this.date = date;
        this.type = type;
        this.name = name;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}