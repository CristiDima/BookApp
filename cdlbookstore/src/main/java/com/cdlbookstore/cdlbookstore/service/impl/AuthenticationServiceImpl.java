package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserAccountDetailsDto;
import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;
import com.cdlbookstore.cdlbookstore.service.AuthenticationService;
import com.cdlbookstore.cdlbookstore.service.UserAccountDetailsService;
import com.cdlbookstore.cdlbookstore.service.UserBooksterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    UserAccountDetailsService userAccountDetailsService;

    @Autowired
    UserBooksterService userBooksterService;

    @Override
    public UserBooksterDto login(LoginForm loginForm) {
        UserAccountDetailsDto userAccountDetailsDto = userAccountDetailsService.getUserAccountByEmail(loginForm.getUsername());
        if (userAccountDetailsDto.getPassword() == loginForm.getPassword()) {
            UserBooksterDto userBooksterDto = userBooksterService.getUserById(userAccountDetailsDto.getId());

            return  userBooksterDto;
        }

        return null;
    }
}
