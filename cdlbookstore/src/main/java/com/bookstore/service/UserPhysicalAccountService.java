package com.bookstore.service;

import com.bookstore.dto.UserPhysicalAccountDto;

import java.util.Optional;

public interface UserPhysicalAccountService {
    Optional<UserPhysicalAccountDto> getByUserId(int userId);
    Optional<UserPhysicalAccountDto> setUserOnlineAccountDto(int userId);
}
