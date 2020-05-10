package com.bookstore.controller;

import com.bookstore.dto.BookDto;
import com.bookstore.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;


    @PostMapping("/book")
    public ResponseEntity<BookDto> saveBook(@RequestBody BookDto bookDto)
    {
        return bookService.saveBook(bookDto)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/book")
    public ResponseEntity<List<BookDto>> getBooks()
    {
        return bookService.getBooks()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/book/{id}")
    private ResponseEntity<BookDto> deleteGenre(@PathVariable("id") int id) {
        return  this.bookService.deleteBook(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
