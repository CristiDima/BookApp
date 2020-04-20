package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserOnlineAccountDto;

public interface UserOnlineAccountService {
    UserOnlineAccountDto getByUserId(int userId);
    UserOnlineAccountDto setUserOnlineAccountDto(int userId);
}
