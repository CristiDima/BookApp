package com.bookstore.service;

import com.bookstore.dto.UserOnlineAccountDto;

import java.util.Optional;

public interface UserOnlineAccountService {
    Optional<UserOnlineAccountDto> getByUserId(int userId);
    Optional<UserOnlineAccountDto> setUserOnlineAccountDto(int userId);
}
