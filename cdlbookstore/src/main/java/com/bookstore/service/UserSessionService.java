package com.bookstore.service;

import com.bookstore.dto.UserSessionDto;

import java.util.Date;

public interface UserSessionService {

    void saveUserSession(UserSessionDto userSessionDto);
    UserSessionDto findUserSessionByToken(String token);
    void updateUserSession(boolean isValid, int userId);
    void updateUserSession(Date createdAt, int userId);
}
