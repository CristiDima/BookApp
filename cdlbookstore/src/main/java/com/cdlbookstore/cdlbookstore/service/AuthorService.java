package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.entities.Author;
import com.cdlbookstore.cdlbookstore.entities.Book;

import java.util.List;

public interface AuthorService {

    void saveAuthor (Author author);
    List<Author> getAuthors ();
    void deleteAuthor(Author author);
}
