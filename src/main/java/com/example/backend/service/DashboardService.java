package com.example.backend.service;

import com.example.backend.model.DashboardData;
import com.example.backend.repository.DashboardDataRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DashboardService {
    
    private final DashboardDataRepository repository;

    public DashboardService(DashboardDataRepository repository) {
        this.repository = repository;
    }

    public List<DashboardData> getPlacementData() {
        return repository.findByCategory("placements");
    }

    public List<DashboardData> getEventData() {
        return repository.findByCategory("events");
    }

    public List<DashboardData> getGpaData() {
        return repository.findByCategory("gpa");
    }
}

