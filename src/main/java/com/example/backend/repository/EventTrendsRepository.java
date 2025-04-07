package com.example.backend.repository;

import com.example.backend.model.EventTrends;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventTrendsRepository extends JpaRepository<EventTrends, Long> {
}
