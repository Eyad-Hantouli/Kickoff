package com.yu.kickoff.service;

import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public String getRoleByUserName(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalAccessError("the user not found "));
        return user.getRole().name() ;
    }

    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalAccessError("the user not found "));
        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Map<String, Object> getUserData(User user) {
        Map<String, Object> response = new HashMap<>();

        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("firstName", user.getFirstName());
        response.put("midName", user.getMidName());
        response.put("lastName", user.getLastName());
        response.put("role", user.getRole().name());
        response.put("address", user.getAddress());
        response.put("bod", user.getBod());
        response.put("city", user.getCity().getName());
        response.put("phoneNumber", user.getPhoneNumber());
        response.put("status", user.getStatus().name());
        response.put("joinDate", user.getTimestamp().toLocalDateTime().toLocalDate());
        response.put("login", true);

        return response;
    }
}