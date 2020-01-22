package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.entities.Book;
import com.cdlbookstore.cdlbookstore.service.AuthorService;
import com.cdlbookstore.cdlbookstore.service.BookService;
import com.cdlbookstore.cdlbookstore.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookTypeService bookTypeService;

    @Autowired
    private AuthorService authorService;

    @PostMapping("/book")
    public ResponseEntity<HttpStatus> saveBook(@RequestBody Book book)
    {
        bookService.saveBook(book);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
