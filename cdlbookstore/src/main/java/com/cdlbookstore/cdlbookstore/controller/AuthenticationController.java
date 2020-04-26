package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.UserSessionDto;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;
import com.cdlbookstore.cdlbookstore.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/user/session")
    private ResponseEntity<String> heartbeat(@RequestBody String token) {
        return authenticationService.heartbeat(token)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
