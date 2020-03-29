package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.AuthorDto;
import com.cdlbookstore.cdlbookstore.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @PostMapping("/author")
    public AuthorDto saveAuthor(@RequestBody AuthorDto authorDto)
    {
        authorService.saveAuthor(authorDto);
        return authorDto;
    }

    @GetMapping("/author")
    public List<AuthorDto> getAuthors()
    {
        List<AuthorDto> authors = authorService.getAuthors();
        return authors;
    }

    @DeleteMapping("/author/{id}")
    public AuthorDto deleteAuthor(@PathVariable("id") int id) {
        AuthorDto authorDto = authorService.getAuthorById(id);
        authorService.deleteAuthor(authorDto);
        return authorDto;
    }
}
