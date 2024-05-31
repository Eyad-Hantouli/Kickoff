package com.yu.kickoff.service;

import com.yu.kickoff.model.MatchSchedule;
import com.yu.kickoff.model.Pitch;
import com.yu.kickoff.repository.MatchScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MatchScheduleService {
    private final MatchScheduleRepository matchScheduleRepository;
    private final PitchService pitchService;
    private final ObjectService objectService;

    @Autowired
    public MatchScheduleService(MatchScheduleRepository matchScheduleRepository,
                                PitchService pitchService,
                                ObjectService objectService) {
        this.matchScheduleRepository = matchScheduleRepository;
        this.pitchService = pitchService;
        this.objectService = objectService;
    }

    public MatchSchedule getScheduleById(Long id) {
        return matchScheduleRepository.findById(id).orElseThrow(() -> new IllegalStateException("No schedule with the given id."));
    }

    public List<Map<String, Object>> getAllSchedulesByPitchId(Long pitchId) {

        List<Map<String, Object>> response = new ArrayList<>();

        Pitch pitch = pitchService.getPitchByPitchId(pitchId);

        List<MatchSchedule> matchScheduleList = matchScheduleRepository.findByPitchId(pitch);

        for (MatchSchedule schedule : matchScheduleList) {
            Map<String, Object> item = new HashMap<>();

            Timestamp timestamp = schedule.getStartTime();

            // Format for 24-hour system hour (HH:mm)
            SimpleDateFormat sdfHour = new SimpleDateFormat("HH:mm");

            // Formatting Timestamp to 24-hour system hour
            String formattedTime = sdfHour.format(timestamp);

            SimpleDateFormat sdfDay = new SimpleDateFormat("EEEE");

            // Formatting Timestamp to day name
            String dayName = sdfDay.format(timestamp);

            item.put("id", schedule.getId());
            item.put("time", formattedTime);
            item.put("day", dayName);
            item.put("state", schedule.getStatus());
            item.put("pitchId", schedule.getPitchId().getId());

            response.add(item);
        }

        return response;
    }

    private long countMatchesWithin2Hours(Timestamp startTime) {
        Timestamp startTimeMinus2Hours = new Timestamp(startTime.getTime() - (2 * 60 * 60 * 1000 - 1)); // 2 hours in milliseconds
        Timestamp startTimePlus2Hours = new Timestamp(startTime.getTime() + (2 * 60 * 60 * 1000 - 1)); // 2 hours in milliseconds
        return matchScheduleRepository.countMatchesWithin4Hours(startTimeMinus2Hours, startTimePlus2Hours);
    }

    public void createSchedule(Map<String, Object> request) {

        Long pitchId = objectService.getLongValue(request, "pitchId");

        Pitch pitch = pitchService.getPitchByPitchId(pitchId);

        Timestamp timestamp = null;

        String dateString = objectService.getStringValue(request, "timestamp");

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date parsedDate = dateFormat.parse(dateString);
            long millis = parsedDate.getTime();
            timestamp = new Timestamp(millis);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if (countMatchesWithin2Hours(timestamp) > 0) {
            throw new IllegalStateException("There is match before at least two hours !!!!");
        }
        MatchSchedule matchSchedule = new MatchSchedule(
                timestamp,
                pitch
        );

        matchScheduleRepository.save(matchSchedule);

    }

    public void deleteSchedule(Map<String, Object> request) {
        matchScheduleRepository.deleteById(objectService.getLongValue(request, "id"));
    }
}
