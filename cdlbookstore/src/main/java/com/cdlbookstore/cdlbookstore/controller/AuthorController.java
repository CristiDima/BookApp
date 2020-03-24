package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.AuthorDto;
import com.cdlbookstore.cdlbookstore.entities.Author;
import com.cdlbookstore.cdlbookstore.mapper.AuthorMapper;
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
    public List<AuthorDto> getAuthors()
    {
        List<AuthorDto> authors = authorService.getAuthors();
        return authors;
    }

    @DeleteMapping("/author/{id}")
    public Author deleteAuthor(@PathVariable("id") int id) {
        Author author = authorService.getAuthorById(id);
        authorService.deleteAuthor(author);
        return author;
    }
}
