package com.yu.kickoff.service;

import com.yu.kickoff.model.Role;
import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public String getRoleByUserName(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new IllegalAccessError("the user not found "));
        return user.getRole().name() ;
    }
}