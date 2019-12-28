package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.repositories.UserBooksterRepository;
import com.cdlbookstore.cdlbookstore.service.UserBooksterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserBooksterServiceImpl implements UserBooksterService {

    @Autowired
    private UserBooksterRepository userBooksterRepositoryer;
}
