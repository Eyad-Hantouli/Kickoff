package com.yu.kickoff.service;

import com.yu.kickoff.model.Match;
import com.yu.kickoff.model.Pitch;
import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class MatchService {

    private final MatchRepository matchRepository;

    @Autowired
    public MatchService(MatchRepository matchRepository) {
        this.matchRepository = matchRepository;
    }



    public Match createMatch(Timestamp time, Pitch pitch, User referee) {
        Match match = new Match(
                time,
                pitch,
                referee
        );

        match = matchRepository.save(match);

        return match;
    }
}
