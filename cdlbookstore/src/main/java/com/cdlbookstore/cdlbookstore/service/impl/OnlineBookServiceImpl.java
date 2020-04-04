package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.repositories.OnlineBookRepository;
import com.cdlbookstore.cdlbookstore.service.OnlineBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OnlineBookServiceImpl implements OnlineBookService {

    @Autowired
    private OnlineBookRepository onlineBookRepository;
}
