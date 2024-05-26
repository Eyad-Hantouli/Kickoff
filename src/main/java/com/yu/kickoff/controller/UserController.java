package com.yu.kickoff.controller;

import com.yu.kickoff.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/system")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get-role-by-username/{username}")
    public Map<String , String> getRoleByUserName(@PathVariable String username) {
        Map<String , String> response = new HashMap<>() ;
        response.put("role" , userService.getRoleByUserName(username)) ;
        return  response ;


    }
}