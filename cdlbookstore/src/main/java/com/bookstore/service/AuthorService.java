package com.bookstore.service;

import com.bookstore.dto.AuthorDto;

import java.util.List;
import java.util.Optional;

public interface AuthorService {

    AuthorDto getAuthorById(int id);
    Optional<List<AuthorDto>> getAuthors ();
    Optional<AuthorDto> saveAuthor (AuthorDto authorDto);
    Optional<AuthorDto> deleteAuthor(int id);
}
