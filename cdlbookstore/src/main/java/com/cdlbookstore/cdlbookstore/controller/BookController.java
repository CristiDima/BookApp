package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.entities.Author;
import com.cdlbookstore.cdlbookstore.entities.Book;
import com.cdlbookstore.cdlbookstore.service.AuthorService;
import com.cdlbookstore.cdlbookstore.service.BookService;
import com.cdlbookstore.cdlbookstore.service.BookTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/book")
    public List<Book> getBooks()
    {
        List<Book> books = bookService.getBooks();
        return books;
    }
}
