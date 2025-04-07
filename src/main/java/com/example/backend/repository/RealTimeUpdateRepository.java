package com.example.backend.repository;

import com.example.backend.model.RealTimeUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealTimeUpdateRepository extends JpaRepository<RealTimeUpdate, Long> {
}
