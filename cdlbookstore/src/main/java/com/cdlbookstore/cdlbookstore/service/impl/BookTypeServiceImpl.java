package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.entities.BookType;
import com.cdlbookstore.cdlbookstore.repositories.BookTypeRepository;
import com.cdlbookstore.cdlbookstore.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookTypeServiceImpl implements BookTypeService {

    @Autowired
    private BookTypeRepository bookTypeRepository;

    @Override
    public BookType getBookTypeById(int id) {
        return bookTypeRepository.findById(id).get();
    };

    @Override
    public List<BookType> getBookTypes() {
        List<BookType> bookTypes = new ArrayList<>();
        bookTypeRepository.findAll().forEach(bookTypes::add);

        return bookTypes;
    }

    @Override
    public void saveBookType(BookType bookType) {
        bookTypeRepository.save(bookType);
    }
}
