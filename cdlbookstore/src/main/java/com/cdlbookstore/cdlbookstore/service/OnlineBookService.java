package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.BookDto;

import java.util.List;

public interface OnlineBookService {
    List<BookDto> getOnlineBooks(int userId);
}
