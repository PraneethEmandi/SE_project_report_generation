package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "placements_new")
public class PlacementDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String company;
    private String status;

    // Constructors
    public PlacementDetail() {}

    public PlacementDetail(String name, String company, String status) {
        this.name = name;
        this.company = company;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
