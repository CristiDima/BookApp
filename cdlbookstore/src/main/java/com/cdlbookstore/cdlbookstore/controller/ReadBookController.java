package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.service.ReadBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReadBookController {

    @Autowired
    private ReadBookService readBookService;
}
