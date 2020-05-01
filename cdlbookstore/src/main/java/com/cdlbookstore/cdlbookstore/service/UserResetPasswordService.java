package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserResetPasswordDto;

public interface UserResetPasswordService {

    UserResetPasswordDto setResetPassToken(int userId);
    UserResetPasswordDto getResetPassToken(int userId, String token);
}
