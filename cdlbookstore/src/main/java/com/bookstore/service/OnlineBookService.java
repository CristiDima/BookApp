package com.bookstore.service;

import com.bookstore.dto.BookDto;

import java.util.List;
import java.util.Optional;

public interface OnlineBookService {
    Optional<List<BookDto>> getOnlineBooks(int userId);
}
