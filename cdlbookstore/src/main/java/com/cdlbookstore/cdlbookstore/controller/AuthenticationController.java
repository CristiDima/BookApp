package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;
import com.cdlbookstore.cdlbookstore.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping("/login")
    private Map<String, Object> login(@RequestBody LoginForm loginForm) {
        return authenticationService.login(loginForm);
    };

    @PostMapping("/signup")
    private ResponseEntity signup(@RequestBody Map<String, String> userDetails) {
        return authenticationService.signup(userDetails);
    }

    @PostMapping("/resetPassword")
    private ResponseEntity resetPassword(@RequestBody String email) {
        return authenticationService.resetPassword(email);
    }
}
