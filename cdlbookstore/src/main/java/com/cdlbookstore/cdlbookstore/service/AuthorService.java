package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.AuthorDto;
import com.cdlbookstore.cdlbookstore.entities.Author;
import com.cdlbookstore.cdlbookstore.entities.Book;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

public interface AuthorService {

    AuthorDto getAuthorById(int id);
    Optional<List<AuthorDto>> getAuthors ();
    Optional<AuthorDto> saveAuthor (AuthorDto authorDto);
    Optional<AuthorDto> deleteAuthor(int id);
}
