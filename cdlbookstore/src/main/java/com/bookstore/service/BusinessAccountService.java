package com.bookstore.service;

import com.bookstore.dto.BusinessAccountDto;

import java.util.Optional;

public interface BusinessAccountService {
    Optional<BusinessAccountDto> getByUserId(int userId);
    Optional<BusinessAccountDto> setUserBusinessAccountDto(int userId);
    Optional<BusinessAccountDto> updateBusinessAccountDto(int userId);
}
