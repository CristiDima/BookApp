package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;


    @PostMapping("/book")
    public BookDto saveBook(@RequestBody BookDto bookDto)
    {
        bookService.saveBook(bookDto);
        return bookDto;
    }

    @GetMapping("/book")
    public List<BookDto> getBooks()
    {
        List<BookDto> books = bookService.getBooks();
        return books;
    }

    @DeleteMapping("/book/{id}")
    private BookDto deleteGenre(@PathVariable("id") int id){
        BookDto bookDto = this.bookService.getBookById(id);
        this.bookService.deleteBook(bookDto);

        return bookDto;
    }
}
