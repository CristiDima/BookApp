package com.bookstore.service.impl;

import com.bookstore.dto.UserResetPasswordDto;
import com.bookstore.entities.UserResetPassword;
import com.bookstore.repositories.UserResetPasswordRepository;
import com.bookstore.service.UserResetPasswordService;
import com.bookstore.mapper.UserResetPasswordMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Service
public class UserResetPasswordServiceImpl implements UserResetPasswordService {


    @Autowired
    UserResetPasswordRepository userResetPasswordRepository;

    @Autowired
    UserResetPasswordMapper userResetPasswordMapper;

    @Override
    public UserResetPasswordDto setResetPassToken(int userId) {
        UserResetPassword userResetPassword = new UserResetPassword();
        UUID token = UUID.randomUUID();
        userResetPassword.setToken(token.toString());
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MINUTE, 60);
        Date date = c.getTime();
        userResetPassword.setExpiresAt(date);
        userResetPassword.setUserId(userId);
        userResetPasswordRepository.save(userResetPassword);

        return userResetPasswordMapper.userResetPasswordToUserResetPasswordDto(userResetPassword);
    }

    @Override
    public UserResetPasswordDto getResetPassToken(int userId, String token) {
        UserResetPassword userResetPassword = userResetPasswordRepository.findByUserIdAndToken(userId, token);

        return  userResetPasswordMapper.userResetPasswordToUserResetPasswordDto(userResetPassword);
    }
}
