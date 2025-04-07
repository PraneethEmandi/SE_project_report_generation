package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "updates")
public class RealTimeUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;

    // Constructors
    public RealTimeUpdate() {}

    public RealTimeUpdate(String text) {
        this.text = text;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}
