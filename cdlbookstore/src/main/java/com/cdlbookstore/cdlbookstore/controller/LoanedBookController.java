package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.service.LoanedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LoanedBookController {

    @Autowired
    private LoanedBookService loanedBookService;

    @GetMapping("/loanedBooks/{id}")
    private ResponseEntity<List<BookDto>> getLoanedBooks(@PathVariable int id) {
        return loanedBookService.getLoanedBooks(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
