package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.entities.Author;
import com.cdlbookstore.cdlbookstore.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping("/author")
    public Author saveAuthor(@RequestBody Author author)
    {
        authorService.saveAuthor(author);
        return author;
    }

    @GetMapping("/author")
    public List<Author> getAuthors()
    {
        List<Author> authors = authorService.getAuthors();
        return authors;
    }

    @DeleteMapping("/author")
    public Author deleteAuthor(@RequestBody Author author) {
        authorService.deleteAuthor(author);
        return author;
    }
}
