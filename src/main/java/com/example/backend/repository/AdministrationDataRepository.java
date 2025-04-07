package com.example.backend.repository;



import com.example.backend.model.AdministrationData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministrationDataRepository extends JpaRepository<AdministrationData, Long> {}

