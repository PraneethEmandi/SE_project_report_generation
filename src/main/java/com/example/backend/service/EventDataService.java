package com.example.backend.service;

import com.example.backend.model.EventTrends;
import com.example.backend.model.DepartmentParticipation;
import com.example.backend.model.EventTimeline;
import com.example.backend.repository.EventTrendsRepository;
import com.example.backend.repository.DepartmentParticipationRepository;
import com.example.backend.repository.EventTimelineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventDataService {

    @Autowired
    private EventTrendsRepository eventTrendsRepository;

    @Autowired
    private DepartmentParticipationRepository departmentParticipationRepository;

    @Autowired
    private EventTimelineRepository eventTimelineRepository;

    public List<EventTrends> getEventTrends() {
        return eventTrendsRepository.findAll();
    }

    public List<DepartmentParticipation> getDepartmentParticipation() {
        return departmentParticipationRepository.findAll();
    }

    public List<EventTimeline> getEventTimeline() {
        return eventTimelineRepository.findAll();
    }
}