package com.yu.kickoff.controller;

import com.yu.kickoff.service.MatchRegisterationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/system")
public class MatchRegisterationController {
    private final MatchRegisterationService matchRegisterationService;

    @Autowired
    public MatchRegisterationController(MatchRegisterationService matchRegisterationService) {
        this.matchRegisterationService = matchRegisterationService;
    }

    @GetMapping(path = "/get-all-matches/pitch/{pitchId}/user/{username}")
    public List<Map<String, Object>> getAllMatchesByUsername(
            @PathVariable Long pitchId,
            @PathVariable String username
    ) {
        return matchRegisterationService.getAllMatchesByUsername(pitchId, username);
    }
}
