package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.service.PlacementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/placements")
// @CrossOrigin(
//     origins = {
//         "http://localhost:8081", 
//         },
//     methods = {
//                 RequestMethod.OPTIONS,
//                 RequestMethod.GET,
//                 RequestMethod.PUT,
//                 RequestMethod.DELETE,
//                 RequestMethod.POST
// },
// allowCredentials = "true"
// )
public class PlacementController {

    @Autowired
    private PlacementService placementService;

    @GetMapping("/trends")
    public List<PlacementTrend> getPlacementTrends() {
        return placementService.getPlacementTrends();
    }

    @GetMapping("/companies")
    public List<CompanyAnalysis> getCompanyAnalysis() {
        return placementService.getCompanyAnalysis();
    }

    @GetMapping("/details")
    public List<PlacementDetail> getPlacementDetails() {
        return placementService.getPlacementDetails();
    }

    @GetMapping("/updates")
    public List<RealTimeUpdate> getRealTimeUpdates() {
        return placementService.getRealTimeUpdates();
    }
}
