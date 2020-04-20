package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface UserBooksterService {

    UserBooksterDto getUserById(int id);
    UserBooksterDto saveUser(UserBooksterDto userBooksterDto);
    Map<String, String> updateUser(int userId, Map<String, String> userDetails) throws Exception;
    void updateUserInfoById(String firstName, String lastName, String phoneNumber, Integer userId);
}
