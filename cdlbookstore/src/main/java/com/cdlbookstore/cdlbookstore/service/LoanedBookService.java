package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.BookDto;

import java.util.List;
import java.util.Optional;

public interface LoanedBookService {

    Optional<List<BookDto>> getLoanedBooks(int userId);
}
