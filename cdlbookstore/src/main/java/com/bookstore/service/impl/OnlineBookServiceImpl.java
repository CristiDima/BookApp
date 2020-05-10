package com.bookstore.service.impl;

import com.bookstore.dto.BookDto;
import com.bookstore.entities.OnlineBook;
import com.bookstore.repositories.OnlineBookRepository;
import com.bookstore.service.BookService;
import com.bookstore.service.OnlineBookService;
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
