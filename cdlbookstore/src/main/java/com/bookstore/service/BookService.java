package com.bookstore.service;

import com.bookstore.dto.BookDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface BookService {

    BookDto getBookById(int id);
    Optional<List<BookDto>> getBooks ();
    Optional<BookDto> saveBook(BookDto bookDto);
    Optional<BookDto> deleteBook (int id);
}
