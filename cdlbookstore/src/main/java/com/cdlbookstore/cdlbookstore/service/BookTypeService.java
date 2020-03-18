package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.entities.BookType;

import java.util.List;

public interface BookTypeService {

    BookType getBookTypeById(int id);
    List<BookType> getBookTypes();
    void saveBookType(BookType bookType);
}
