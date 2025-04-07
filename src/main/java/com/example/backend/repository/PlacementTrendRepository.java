package com.example.backend.repository;

import com.example.backend.model.PlacementTrend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementTrendRepository extends JpaRepository<PlacementTrend, Long> {
}
