package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserPhysicalAccountDto;

import java.util.Optional;

public interface UserPhysicalAccountService {
    Optional<UserPhysicalAccountDto> getByUserId(int userId);
    Optional<UserPhysicalAccountDto> setUserOnlineAccountDto(int userId);
}
