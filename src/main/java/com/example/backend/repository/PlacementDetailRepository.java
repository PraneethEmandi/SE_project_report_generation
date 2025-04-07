package com.example.backend.repository;

import com.example.backend.model.PlacementDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacementDetailRepository extends JpaRepository<PlacementDetail, Long> {
}