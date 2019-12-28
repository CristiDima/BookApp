package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.repositories.ReadBookRepository;
import com.cdlbookstore.cdlbookstore.service.ReadBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReadBookServiceImpl implements ReadBookService {

    @Autowired
    private ReadBookRepository readBookRepository;
}
