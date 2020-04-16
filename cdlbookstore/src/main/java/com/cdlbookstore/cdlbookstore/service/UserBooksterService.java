package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;

public interface UserBooksterService {

    UserBooksterDto getUserById(int id);
    UserBooksterDto saveUser(UserBooksterDto userBooksterDto);
}
