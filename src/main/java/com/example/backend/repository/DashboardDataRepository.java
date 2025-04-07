package com.example.backend.repository;

import com.example.backend.model.DashboardData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DashboardDataRepository extends JpaRepository<DashboardData, Long> {
    List<DashboardData> findByCategory(String category);
}

