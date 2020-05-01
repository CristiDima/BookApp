package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserResetPasswordDto;
import com.cdlbookstore.cdlbookstore.entities.UserResetPassword;
import com.cdlbookstore.cdlbookstore.mapper.UserResetPasswordMapper;
import com.cdlbookstore.cdlbookstore.repositories.UserResetPasswordRepository;
import com.cdlbookstore.cdlbookstore.service.UserResetPasswordService;
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
