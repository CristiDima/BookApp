package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserAccountDetailsDto;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;

public interface UserAccountDetailsService {

    UserAccountDetailsDto getUserAccountByCredentials(LoginForm loginForm);
    UserAccountDetailsDto findUserByEmail(String email);
    void saveUserAccountDetails(UserAccountDetailsDto userAccountDetailsDto);
}
