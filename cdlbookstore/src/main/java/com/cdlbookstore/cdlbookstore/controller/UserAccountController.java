package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.entities.UserAccount;
import com.cdlbookstore.cdlbookstore.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserAccountController {

    @Autowired
    private UserAccountService userAccountService;
}
