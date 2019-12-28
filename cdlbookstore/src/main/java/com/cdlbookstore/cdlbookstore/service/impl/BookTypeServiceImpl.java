package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.repositories.BookTypeRepository;
import com.cdlbookstore.cdlbookstore.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookTypeServiceImpl implements BookTypeService {

    @Autowired
    private BookTypeRepository bookTypeRepository;
}
