package com.yu.kickoff.service;

import com.yu.kickoff.model.MatchRegisteration;
import com.yu.kickoff.model.MatchSchedule;
import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.MatchRegisterationRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MatchRegisterationService {
    private final MatchRegisterationRespository matchRegisterationRespository;
    private final MatchScheduleService matchScheduleService;
    private final ObjectService objectService;
    private final UserService userService;
    private final MatchStatisticsService matchStatisticsService;
    private final RelationsService relationsService;


    @Autowired
    public MatchRegisterationService(MatchRegisterationRespository matchRegisterationRespository,
                                     MatchScheduleService matchScheduleService,
                                     ObjectService objectService,
                                     UserService userService,
                                     MatchStatisticsService matchStatisticsService,
                                     RelationsService relationsService) {
        this.matchRegisterationRespository = matchRegisterationRespository;
        this.matchScheduleService = matchScheduleService;
        this.objectService = objectService;
        this.userService = userService;
        this.matchStatisticsService = matchStatisticsService;
        this.relationsService = relationsService;
    }

    public List<Map<String, Object>> getAllMatchesByUsername(Long pitchId, String username) {
        List<Map<String, Object>> response = new ArrayList<>();

        List<Map<String, Object>> scheduleList = matchScheduleService.getAllSchedulesByPitchId(pitchId);

        for (Map<String, Object> match : scheduleList) {
            Map<String, Object> data = new HashMap<>();
            List<Map<String, Object>> positions = new ArrayList<>();
            data.put("id", match.get("id"));
            data.put("time", match.get("time"));
            data.put("state", match.get("state"));

            MatchSchedule matchSchedule = matchScheduleService.getScheduleById(
                    objectService.getLongValue(match, "id")
            );

            List<MatchRegisteration> registeredList = matchRegisterationRespository.findAllByMatchScheduleId(matchSchedule);
            Long scoreSum = 0L;

            for (MatchRegisteration register : registeredList) {
                Map<String, Object> userData = new HashMap<>();
                User targetUser = register.getUserName();
                scoreSum += matchStatisticsService.getUserTotalScore(targetUser.getUsername());

                userData.put("username", targetUser.getUsername());
                userData.put("position_number", register.getPositionNumber());
                userData.put("team_number", register.getTeamNumber());
                userData.put("position", register.getPosition().name());

                User sourceUser = userService.getUserByUsername(username);
                Object relationType = relationsService.getRelationType(sourceUser, targetUser);

                userData.put("relation_type", relationType);

                positions.add(userData);
            }

            data.put("score_sum", scoreSum);
            data.put("positions", positions);
            data.put("registered_players", positions.size());

            response.add(data);
        }

        return response;
    }
}
