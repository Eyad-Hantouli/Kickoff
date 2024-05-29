package com.yu.kickoff.service;

import com.yu.kickoff.model.AddPitchRequest;
import com.yu.kickoff.model.Pitch;
import com.yu.kickoff.repository.PitchRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PitchService {

    PitchRepository pitchRepository;

    @Autowired
    public PitchService(PitchRepository pitchRepository) {
        this.pitchRepository = pitchRepository;
    }

    @Transactional
    public void createPitch(AddPitchRequest request) {
        Pitch pitch = new Pitch(
            request.getPitchName(),
            request.getPrice(),
            request.getOwnershipDocumentation(),
            request.getAddress(),
            request.getAuthor(),
            request.getCity()
        );

        pitchRepository.save(pitch);
    }

}
