package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.AuthorDto;
import com.cdlbookstore.cdlbookstore.entities.Author;
import com.cdlbookstore.cdlbookstore.entities.Book;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface AuthorService {

    AuthorDto getAuthorById(int id);
    List<AuthorDto> getAuthors ();

    void saveAuthor (AuthorDto authorDto);
    void deleteAuthor(AuthorDto authorDto);
}
