package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserCredentialsDto;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;

public interface UserCredentialsService {

    UserCredentialsDto getUserAccountByCredentials(LoginForm loginForm);
    UserCredentialsDto findUserByEmail(String email);
    void saveUserAccountDetails(UserCredentialsDto userCredentialsDto);
}
