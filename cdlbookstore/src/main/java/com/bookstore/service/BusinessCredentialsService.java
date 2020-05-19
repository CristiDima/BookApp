package com.bookstore.service;

import com.bookstore.dto.BusinessCredentialsDto;
import com.bookstore.forms.LoginForm;

public interface BusinessCredentialsService {

    BusinessCredentialsDto getUserAccountByCredentials(LoginForm loginForm);
    BusinessCredentialsDto findUserByEmail(String email);
    BusinessCredentialsDto findUserByBusinessId(int userId);
    void saveBusinessAccountDetails(BusinessCredentialsDto userCredentialsDto);
    void updateEmailByBusinessId(String email, Integer businessId);
    void updatePasswordByBusinessId(String password, Integer businessId);
}
