package com.bookstore.service;

import com.bookstore.dto.UserCredentialsDto;
import com.bookstore.forms.LoginForm;

public interface UserCredentialsService {

    UserCredentialsDto getUserAccountByCredentials(LoginForm loginForm);
    UserCredentialsDto findUserByEmail(String email);
    UserCredentialsDto findUserByUserId(int userId);
    void saveUserAccountDetails(UserCredentialsDto userCredentialsDto);
    void updateEmailByUserId(String email, Integer userId);
    void updatePasswordByUserId(String password, Integer userId);
}
