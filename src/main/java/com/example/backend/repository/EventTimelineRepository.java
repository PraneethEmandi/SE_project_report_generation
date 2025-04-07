package com.example.backend.repository;

import com.example.backend.model.EventTimeline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventTimelineRepository extends JpaRepository<EventTimeline, Long> {
}