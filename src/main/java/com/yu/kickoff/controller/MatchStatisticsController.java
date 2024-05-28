package com.yu.kickoff.controller;

import com.yu.kickoff.model.User;
import com.yu.kickoff.service.LeaderBoardService;
import com.yu.kickoff.service.MatchStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/system")
public class MatchStatisticsController {
    private final MatchStatisticsService matchStatisticsService;

    @Autowired
    public MatchStatisticsController(MatchStatisticsService matchStatisticsService) {
        this.matchStatisticsService = matchStatisticsService;
    }

    @GetMapping("/user/{username}/total-statistics")
    public Map<String, Object> getTotalStatisticsByUser(@PathVariable String username) {
        System.out.println(1);
        return matchStatisticsService.getTotalStatisticsByUser(username);
    }

    @GetMapping("/user/{username}/total-score")
    public Long getTotalScoreByUser(@PathVariable String username) {
        return matchStatisticsService.getUserTotalScore(username);
    }

    @GetMapping("/user/{username}/user-statistics")
    public Map<String, Object> getUserStatisticsByUsername(@PathVariable String username) {
        return matchStatisticsService.getUserStatisticsByUsername(username);
    }
}
