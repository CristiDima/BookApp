package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserAccountDetailsDto;

public interface UserAccountDetailsService {

    UserAccountDetailsDto getUserAccountByEmail(String email);
}
