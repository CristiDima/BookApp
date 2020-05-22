package com.bookstore.service;

import com.bookstore.dto.UserBookstoreDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserBookstoreService {

    Optional<UserBookstoreDto> getUserById(int id);
    UserBookstoreDto saveUser(UserBookstoreDto userBookstoreDto);
    Optional<Map<String, String>> updateUser(int userId, Map<String, String> userDetails);
    void updateUserInfoById(String firstName, String lastName, String phoneNumber, Integer userId);
    UserBookstoreDto getByCompanyName(String businessName);
    void removeUserFromCompany(String email);

    Optional<List<String>> getUsersNameByEmail( List<String> emails);
    Optional<UserBookstoreDto> getUserByEmail(String email);
}
