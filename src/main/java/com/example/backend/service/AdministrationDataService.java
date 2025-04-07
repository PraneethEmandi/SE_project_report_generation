package com.example.backend.service;



import com.example.backend.model.AdministrationData;
import com.example.backend.repository.AdministrationDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministrationDataService {

    @Autowired
    private AdministrationDataRepository repository;

    public List<AdministrationData> getAllData() {
        return repository.findAll();
    }
}

