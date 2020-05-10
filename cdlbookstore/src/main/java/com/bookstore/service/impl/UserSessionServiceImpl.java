package com.bookstore.service.impl;

import com.bookstore.dto.UserSessionDto;
import com.bookstore.entities.UserSession;
import com.bookstore.mapper.UserSessionMapper;
import com.bookstore.repositories.UserSessionRepository;
import com.bookstore.service.UserSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserSessionServiceImpl implements UserSessionService {

    @Autowired
    private UserSessionRepository userSessionRepository;

    @Autowired
    private UserSessionMapper userSessionMapper;

    @Override
    public void saveUserSession(UserSessionDto userSessionDto) {
        userSessionRepository.save(userSessionMapper.userSessionDtoToUserSession(userSessionDto));
    }

    @Override
    public UserSessionDto findUserSessionByToken(String token) {
        UserSession userSession = userSessionRepository.findByToken(token);
        return userSessionMapper.userSessionToUserSessionDto(userSession);
    }

    @Override
    public void updateUserSession(boolean isValid, int userId) {
        userSessionRepository.updateUserSession(isValid, userId);
    }

    @Override
    public void updateUserSession(Date createdAt, int userId) {
        userSessionRepository.updateUserSession(createdAt, userId);
    }
}
