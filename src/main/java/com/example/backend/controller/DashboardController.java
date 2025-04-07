package com.example.backend.controller;

import com.example.backend.model.DashboardData;
import org.springframework.web.bind.annotation.*;
import com.example.backend.service.DashboardService; // Verify the package path or create the DashboardService class if missing

import java.util.List;

@RestController
@RequestMapping("/dashboard")
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
// ) // Adjust as needed
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/placements")
    public List<DashboardData> getPlacements() {
        return dashboardService.getPlacementData();
    }

    @GetMapping("/events")
    public List<DashboardData> getEvents() {
        return dashboardService.getPlacementData();
    }

    @GetMapping("/gpa")
    public List<DashboardData> getGpaTrends() {
        return dashboardService.getGpaData();
    }
}

