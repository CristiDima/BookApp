package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserSessionDto;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;

import java.util.Map;
import java.util.Optional;

public interface AuthenticationService {

    Optional<Map<String, Object>> login(LoginForm loginForm);
    Optional<UserSessionDto> logout(String token);
    Optional<Map<String, String>> signUp(Map<String, String> userDetails);
    Optional<String> resetPassword(String email);
    Optional<String> heartbeat(String token);
    Optional<Boolean> isTokenValid(int userId, String token);
    Optional<Boolean> changePassword(Map<String, Object> userDetails);
}
