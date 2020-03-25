package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.AuthorDto;
import com.cdlbookstore.cdlbookstore.entities.Author;
import com.cdlbookstore.cdlbookstore.entities.Book;

import java.util.List;

public interface AuthorService {

    void saveAuthor (Author author);
    List<AuthorDto> getAuthors ();
    void deleteAuthor(Author author);
    AuthorDto getAuthorById(int id);
}
