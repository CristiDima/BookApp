package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.service.LoanedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoanedBookController {

    @Autowired
    private LoanedBookService loanedBookService;
}