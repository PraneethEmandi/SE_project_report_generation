package com.example.backend.repository;

import com.example.backend.model.DepartmentParticipation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentParticipationRepository extends JpaRepository<DepartmentParticipation, Long> {
}

