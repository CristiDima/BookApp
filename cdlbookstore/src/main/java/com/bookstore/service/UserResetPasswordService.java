package com.bookstore.service;

import com.bookstore.dto.UserResetPasswordDto;

public interface UserResetPasswordService {

    UserResetPasswordDto setResetPassToken(int userId);
    UserResetPasswordDto getResetPassToken(int userId, String token);
}
