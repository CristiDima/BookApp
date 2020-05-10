package com.bookstore.controller;

import com.bookstore.service.AuthenticationService;
import com.bookstore.dto.UserSessionDto;
import com.bookstore.forms.LoginForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/login")
    private ResponseEntity<Map<String, Object>> login(@RequestBody LoginForm loginForm) {
        return authenticationService.login(loginForm)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    };

    @PutMapping("/logout")
    private ResponseEntity<UserSessionDto> logout(@RequestBody String token) {
        return authenticationService.logout(token)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    };

    @PostMapping("/signup")
    private ResponseEntity<Map<String, String>> signUp(@RequestBody Map<String, String> userDetails) {
        return authenticationService.signUp(userDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/resetPassword")
    private ResponseEntity<String> resetPassword(@RequestBody String email) {
        return authenticationService.resetPassword(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/resetPassword/{id}/{token}")
    private ResponseEntity<Boolean> resetPassword(@PathVariable int id, @PathVariable String token) {
        return authenticationService.isTokenValid(id, token)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/changePassword")
    private ResponseEntity<Boolean> changePassword(@RequestBody Map<String, Object> userDetails) {
        return authenticationService.changePassword(userDetails)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/user/session")
    private ResponseEntity<String> heartbeat(@RequestBody String token) {
        return authenticationService.heartbeat(token)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
