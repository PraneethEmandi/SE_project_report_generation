package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "placement_trends_new")
public class PlacementTrend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String month;
    private int placements;
    private int interviews;

    // Constructors
    public PlacementTrend() {}

    public PlacementTrend(String month, int placements, int interviews) {
        this.month = month;
        this.placements = placements;
        this.interviews = interviews;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getMonth() { return month; }
    public void setMonth(String month) { this.month = month; }

    public int getPlacements() { return placements; }
    public void setPlacements(int placements) { this.placements = placements; }

    public int getInterviews() { return interviews; }
    public void setInterviews(int interviews) { this.interviews = interviews; }
}
