package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserPhysicalAccountDto;

public interface UserPhysicalAccountService {
    UserPhysicalAccountDto getByUserId(int userId);
    UserPhysicalAccountDto setUserOnlineAccountDto(int userId);
}
