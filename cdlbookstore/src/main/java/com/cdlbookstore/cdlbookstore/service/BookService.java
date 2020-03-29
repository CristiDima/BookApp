package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.entities.Book;

import java.util.List;

public interface BookService {

    BookDto getBookById(int id);
    List<BookDto> getBooks ();

    void saveBook(BookDto bookDto);
    void deleteBook (BookDto bookDto);
}
