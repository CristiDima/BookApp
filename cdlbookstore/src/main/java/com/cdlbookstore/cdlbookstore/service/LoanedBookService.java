package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.BookDto;

import java.util.List;

public interface LoanedBookService {

    List<BookDto> getLoannedBooks(int userId);
}
