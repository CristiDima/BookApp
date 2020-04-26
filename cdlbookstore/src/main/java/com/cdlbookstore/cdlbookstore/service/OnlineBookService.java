package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.BookDto;

import java.util.List;
import java.util.Optional;

public interface OnlineBookService {
    Optional<List<BookDto>> getOnlineBooks(int userId);
}
