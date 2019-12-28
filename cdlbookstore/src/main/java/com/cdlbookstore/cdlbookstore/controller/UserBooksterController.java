package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.service.UserBooksterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserBooksterController {

    @Autowired
    private UserBooksterService userBooksterService;
}
