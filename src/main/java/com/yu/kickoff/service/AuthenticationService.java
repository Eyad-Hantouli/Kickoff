package com.yu.kickoff.service;


import com.yu.kickoff.model.AuthenticationResponse;
import com.yu.kickoff.model.Token;
import com.yu.kickoff.model.User;
import com.yu.kickoff.repository.TokenRepository;
import com.yu.kickoff.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final TokenRepository tokenRepository;

    private final AuthenticationManager authenticationManager;
    private final ObjectService objectService;
    private final CityService cityService;
    private final UserService userService;

    @Autowired
    public AuthenticationService(UserRepository repository,
                                 PasswordEncoder passwordEncoder,
                                 JwtService jwtService,
                                 TokenRepository tokenRepository,
                                 AuthenticationManager authenticationManager,
                                 ObjectService objectService,
                                 CityService cityService,
                                 UserService userService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
        this.objectService = objectService;
        this.cityService = cityService;
        this.userService = userService;

    }

    public AuthenticationResponse register(Map<String, Object> requestData) {

        User user = new User(
            objectService.getStringValue(requestData, "username"),
            objectService.getStringValue(requestData, "firstName"),
            objectService.getStringValue(requestData, "midName"),
            objectService.getStringValue(requestData, "lastName"),
            objectService.getLocalDateValue(requestData, "dob", "yyyy-MM-dd"),
            objectService.getStringValue(requestData, "address"),
            passwordEncoder.encode(objectService.getStringValue(requestData, "password")),
            objectService.getStringValue(requestData, "phoneNumber"),
            cityService.getCityByName(
                    objectService.getStringValue(requestData, "city")
            )
        );

        // check if user already exist. if exist than authenticate the user
        if(repository.findByUsername(user.getUsername()).isPresent()) {
            return new AuthenticationResponse(null, "User already exist");
        }

        user = repository.save(user);

        String jwt = jwtService.generateToken(user);

        saveUserToken(jwt, user);

        return new AuthenticationResponse(jwt, "User registration was successful");

    }

    public Map<String, Object> authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = repository.findByUsername(request.getUsername()).orElseThrow(() -> new IllegalStateException("user not found"));
        String jwt = jwtService.generateToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(jwt, user);

        Map<String, Object> response = new HashMap<>();
        response.put("user", userService.getUserData(user));
        response.put("token", jwt);
        response.put("message", "User login was successful");

        return response;

    }
    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
        if(validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t-> {
            t.setLoggedOut(true);
            tokenRepository.delete(t);
        });

//        tokenRepository.saveAll(validTokens);
    }
    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }
}
