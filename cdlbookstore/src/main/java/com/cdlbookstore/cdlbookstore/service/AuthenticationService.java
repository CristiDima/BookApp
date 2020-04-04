package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;

public interface AuthenticationService {

    UserBooksterDto login(LoginForm loginForm);
}
