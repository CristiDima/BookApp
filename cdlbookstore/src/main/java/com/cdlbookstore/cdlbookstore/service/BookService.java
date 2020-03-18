package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.entities.Book;

import java.util.List;

public interface BookService {

    void saveBook(Book book);
    List<Book> getBooks ();
}
