package com.yu.kickoff.service;

import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.MatchStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MatchStatisticsService {
    private final MatchStatisticsRepository matchStatisticsRepository;
    private final UserService userService;
    private final ObjectService objectService;
    private final ScoreService scoreService;


    @Autowired
    public MatchStatisticsService(MatchStatisticsRepository matchStatisticsRepository,
                                  UserService userService,
                                  ObjectService objectService,
                                  ScoreService scoreService) {
        this.matchStatisticsRepository = matchStatisticsRepository;
        this.userService = userService;
        this.objectService = objectService;
        this.scoreService = scoreService;
    }

    public Map<String, Object> getTotalStatisticsByUser(String username) {

        User user = userService.getUserByUsername(username);

        Map<String, Object> statistics = matchStatisticsRepository.findSumsByUserName(username);
        return statistics;
    }

    public Long getUserTotalScore(String username) {
        User user = userService.getUserByUsername(username);

        Map<String, Object> statistics = getTotalStatisticsByUser(username);

        Set<String> scoresToBeCalculated = new HashSet<>();
        Collections.addAll(scoresToBeCalculated,
                "goals",
                "yellowCard",
                "redCard",
                "fouls",
                "motm");

        long totalScore = 0;

        for(Map.Entry<String, Object> entry : statistics.entrySet()) {
            if (scoresToBeCalculated.contains(entry.getKey()))
                totalScore +=  objectService.getLongValue(statistics, entry.getKey()) * scoreService.getScoreByTitle(entry.getKey()).getScore();
        }

        return totalScore;
    }

    public Map<String, Object> getUserStatisticsByUsername(String username) {
        Map<String, Object> response = matchStatisticsRepository.findSumsByUserName(username);
        response.put("scores", getUserTotalScore(username));

        return response;
    }
}
