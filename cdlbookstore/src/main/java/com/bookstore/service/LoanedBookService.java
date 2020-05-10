package com.bookstore.service;

import com.bookstore.dto.BookDto;

import java.util.List;
import java.util.Optional;

public interface LoanedBookService {

    Optional<List<BookDto>> getLoanedBooks(int userId);
}
