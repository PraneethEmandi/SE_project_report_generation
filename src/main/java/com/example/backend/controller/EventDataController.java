package com.example.backend.controller;

import com.example.backend.model.EventTrends;
import com.example.backend.model.DepartmentParticipation;
import com.example.backend.model.EventTimeline;
import com.example.backend.service.EventDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
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
public class EventDataController {

    @Autowired
    private EventDataService eventDataService;

    @GetMapping("/trends")
    public List<EventTrends> getEventTrends() {
        return eventDataService.getEventTrends();
    }

    @GetMapping("/departments")
    public List<DepartmentParticipation> getDepartmentParticipation() {
        return eventDataService.getDepartmentParticipation();
    }

    @GetMapping("/timeline")
    public List<EventTimeline> getEventTimeline() {
        return eventDataService.getEventTimeline();
    }
}
