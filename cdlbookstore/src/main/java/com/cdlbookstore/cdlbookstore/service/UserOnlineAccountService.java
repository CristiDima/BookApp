package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserOnlineAccountDto;

import java.util.Optional;

public interface UserOnlineAccountService {
    Optional<UserOnlineAccountDto> getByUserId(int userId);
    Optional<UserOnlineAccountDto> setUserOnlineAccountDto(int userId);
}
