package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;
}
