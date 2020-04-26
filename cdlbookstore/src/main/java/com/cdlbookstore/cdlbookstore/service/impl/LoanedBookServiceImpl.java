package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.entities.LoanedBook;
import com.cdlbookstore.cdlbookstore.repositories.LoanedBookRepository;
import com.cdlbookstore.cdlbookstore.service.BookService;
import com.cdlbookstore.cdlbookstore.service.LoanedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LoanedBookServiceImpl implements LoanedBookService {

    @Autowired
    private LoanedBookRepository loanedBookRepository;

    @Autowired
    private BookService bookService;

    @Override
    public Optional<List<BookDto>> getLoanedBooks(int userId){
        List<LoanedBook> loanedBooks = new ArrayList<>();
        loanedBookRepository.findByUserId(userId).forEach(loanedBooks::add);
        List<BookDto> books = new ArrayList<>();
        loanedBooks.forEach(loanedBook ->
            books.add(bookService.getBookById(loanedBook.getBookId()))
        );
        return Optional.ofNullable(books);
    }
}
