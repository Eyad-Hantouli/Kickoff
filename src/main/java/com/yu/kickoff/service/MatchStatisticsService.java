package com.yu.kickoff.service;

import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.MatchStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class MatchStatisticsService {
    private final MatchStatisticsRepository matchStatisticsRepository;
    private final UserService userService;


    @Autowired
    public MatchStatisticsService(MatchStatisticsRepository matchStatisticsRepository,
                                  UserService userService) {
        this.matchStatisticsRepository = matchStatisticsRepository;
        this.userService = userService;
    }

    public Map<String, Object> getTotalStatisticsByUser(String username) {

        User user = userService.getUserByUsername(username);

        Map<String, Object> statistics = matchStatisticsRepository.findSumsByUserName(username);
        return statistics;
    }
}
