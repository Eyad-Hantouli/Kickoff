package com.yu.kickoff.service;

import com.yu.kickoff.model.UpgradeAccountRequest;
import com.yu.kickoff.model.UpgradeAccountRequestDTO;
import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.UpgradeAccountRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UpgradeAccountRequestService {

    private final UpgradeAccountRequestRepository upgradeAccountRequestRepository;
    private final UserService userService;

    @Autowired
    public UpgradeAccountRequestService(UpgradeAccountRequestRepository upgradeAccountRequestRepository,
                                        UserService userService) {
        this.upgradeAccountRequestRepository = upgradeAccountRequestRepository;
        this.userService = userService;
    }

    public void saveRequest(UpgradeAccountRequestDTO request) {
        User user = userService.getUserByUsername(request.getUsername());
        if (upgradeAccountRequestRepository.countByAuthor(user) > 0L) {
            System.out.println("-----------------------------\nRequest Already Sent !!!!!!\n-----------------------------");
            return;
        }

        UpgradeAccountRequest upgradeAccountRequest = new UpgradeAccountRequest(
            user,
            request.getIdCardFace1(),
            request.getIdCardFace2()
        );

        upgradeAccountRequestRepository.save(upgradeAccountRequest);
    }
}