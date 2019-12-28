package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorController {

    @Autowired
    private AuthorService authorService;
}
