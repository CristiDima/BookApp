package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.service.LoanedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LoanedBookController {

    @Autowired
    private LoanedBookService loanedBookService;

    @GetMapping("/loannedBooks/{id}")
    private List<BookDto> getLoannedBooks(@PathVariable int id) {
        return this.loanedBookService.getLoannedBooks(id);
    }
}
