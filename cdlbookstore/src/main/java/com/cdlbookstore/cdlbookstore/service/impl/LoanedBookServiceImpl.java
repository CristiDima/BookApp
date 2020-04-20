package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.entities.Book;
import com.cdlbookstore.cdlbookstore.entities.LoanedBook;
import com.cdlbookstore.cdlbookstore.mapper.LoanedBookMapper;
import com.cdlbookstore.cdlbookstore.repositories.LoanedBookRepository;
import com.cdlbookstore.cdlbookstore.service.BookService;
import com.cdlbookstore.cdlbookstore.service.LoanedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoanedBookServiceImpl implements LoanedBookService {

    @Autowired
    private LoanedBookRepository loanedBookRepository;

    @Autowired
    private LoanedBookMapper loanedBookMapper;

    @Autowired
    private BookService bookService;

    @Override
    public List<BookDto> getLoannedBooks(int userId){
        List<LoanedBook> loannedBooks = new ArrayList<>();
        loanedBookRepository.findByUserId(userId).forEach(loannedBooks::add);
        List<BookDto> books = new ArrayList<>();
        loannedBooks.forEach(loanedBook ->
            books.add(bookService.getBookById(loanedBook.getBookId()))
        );
        return books;
    }
}
