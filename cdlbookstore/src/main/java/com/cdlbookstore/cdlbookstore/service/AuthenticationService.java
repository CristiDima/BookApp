package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AuthenticationService {

    Map<String, Object> login(LoginForm loginForm);
    ResponseEntity signup(Map<String, String> userDetails);
    ResponseEntity resetPassword(String email);
}
