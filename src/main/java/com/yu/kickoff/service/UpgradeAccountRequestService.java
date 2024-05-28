package com.yu.kickoff.service;

import com.yu.kickoff.model.Role;
import com.yu.kickoff.model.UpgradeAccountRequest;
import com.yu.kickoff.model.UpgradeAccountRequestDTO;
import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.UpgradeAccountRequestRepository;
import com.yu.kickoff.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UpgradeAccountRequestService {

    private final UpgradeAccountRequestRepository upgradeAccountRequestRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UpgradeAccountRequestService(UpgradeAccountRequestRepository upgradeAccountRequestRepository,
                                        UserService userService,
                                        UserRepository userRepository) {
        this.upgradeAccountRequestRepository = upgradeAccountRequestRepository;
        this.userService = userService;
        this.userRepository = userRepository;
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

    public List<Map<String, Object>> getUpgradeAccountRequest() {
        List<UpgradeAccountRequest> upgradeAccountRequests = upgradeAccountRequestRepository.findAll();

        List<Map<String, Object>> response = new ArrayList<>();

        for (UpgradeAccountRequest item : upgradeAccountRequests) {
            Map<String, Object> map = new HashMap<>();
            map.put("username", item.getAuthor().getUsername());
            map.put("face1", Base64.getEncoder().encodeToString(item.getIdCardFace1()));
            map.put("face2", Base64.getEncoder().encodeToString(item.getIdCardFace2()));

            response.add(map);
        }

        return response;
    }

    @Transactional
    public void rejectRequest(String username) {
        User user = userService.getUserByUsername(username);
        upgradeAccountRequestRepository.deleteByAuthor(user);
    }

    @Transactional
    public void acceptRequest(String username) {
        User user = userService.getUserByUsername(username);
        user.setRole(Role.PITCH_OWNER);
        userRepository.save(user);

        upgradeAccountRequestRepository.deleteByAuthor(user);
    }
}