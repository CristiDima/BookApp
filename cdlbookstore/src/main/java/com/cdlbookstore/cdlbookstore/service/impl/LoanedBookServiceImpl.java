package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.repositories.LoanedBookRepository;
import com.cdlbookstore.cdlbookstore.service.LoanedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoanedBookServiceImpl implements LoanedBookService {

    @Autowired
    private LoanedBookRepository loanedBookRepository;
}
