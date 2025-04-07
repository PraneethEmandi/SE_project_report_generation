package com.example.backend.repository;

import com.example.backend.model.CompanyAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyAnalysisRepository extends JpaRepository<CompanyAnalysis, Long> {
}
