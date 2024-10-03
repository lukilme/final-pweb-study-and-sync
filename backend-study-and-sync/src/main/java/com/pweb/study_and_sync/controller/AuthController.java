package com.pweb.study_and_sync.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pweb.study_and_sync.model.User;
import com.pweb.study_and_sync.model.dto.LoginDTO;
import com.pweb.study_and_sync.service.AuthService;

import jakarta.persistence.NoResultException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDTO loginData) {
        try {
            User user = authService.loginWithFallback(loginData);
            return ResponseEntity.ok(user);  
        } catch (NoResultException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(null); 
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(null); 
        }
    }
}
