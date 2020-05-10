package com.bookstore.service;

import com.bookstore.dto.UserBookstoreDto;

import java.util.Map;
import java.util.Optional;

public interface UserBookstoreService {

    Optional<UserBookstoreDto> getUserById(int id);
    UserBookstoreDto saveUser(UserBookstoreDto userBookstoreDto);
    Optional<Map<String, String>> updateUser(int userId, Map<String, String> userDetails);
    void updateUserInfoById(String firstName, String lastName, String phoneNumber, Integer userId);
}
