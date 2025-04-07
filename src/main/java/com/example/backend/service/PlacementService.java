package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlacementService {

    @Autowired
    private PlacementTrendRepository placementTrendRepository;

    @Autowired
    private CompanyAnalysisRepository companyAnalysisRepository;

    @Autowired
    private PlacementDetailRepository placementDetailRepository;

    @Autowired
    private RealTimeUpdateRepository realTimeUpdateRepository;

    public List<PlacementTrend> getPlacementTrends() {
        return placementTrendRepository.findAll();
    }

    public List<CompanyAnalysis> getCompanyAnalysis() {
        return companyAnalysisRepository.findAll();
    }

    public List<PlacementDetail> getPlacementDetails() {
        return placementDetailRepository.findAll();
    }

    public List<RealTimeUpdate> getRealTimeUpdates() {
        return realTimeUpdateRepository.findAll();
    }
}