package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.entities.OnlineBook;
import com.cdlbookstore.cdlbookstore.repositories.OnlineBookRepository;
import com.cdlbookstore.cdlbookstore.service.BookService;
import com.cdlbookstore.cdlbookstore.service.OnlineBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OnlineBookServiceImpl implements OnlineBookService {

    @Autowired
    private OnlineBookRepository onlineBookRepository;

    @Autowired
    private BookService bookService;

    @Override
    public Optional<List<BookDto>> getOnlineBooks(int userId) {
        List<OnlineBook> onlineBooks = new ArrayList<>();
        onlineBookRepository.findByUserId(userId).forEach(onlineBooks::add);
        List<BookDto> books = new ArrayList<>();
        onlineBooks.forEach(loanedBook ->
            books.add(bookService.getBookById(loanedBook.getBookId()))
        );
        return Optional.ofNullable(books);
    }
}
