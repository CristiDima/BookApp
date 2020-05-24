package com.bookstore.repositories;

import com.bookstore.entities.Author;
import com.bookstore.entities.Book;
import com.bookstore.entities.Genre;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {
    @Transactional
    @Modifying
    @Query("update Book b set b.rating = ?1, b.votes = ?2 where b.id = ?3")
    void updateBookRating(Double rating, Double votes, Integer bookId);

    @Transactional
    @Modifying
    @Query("update Book b set b.loaned = ?1 where b.id = ?2")
    void updateLoanedBooks(int loanedBooks, Integer bookId);

    @Transactional
    @Modifying
    @Query("update Book b set b.name = ?1, b.authors = ?2, b.genres = ?3, b.description = ?4," +
            "b.total = ?5, b.year = ?6, b.pages = ?7, b.file = ?8, b.photo = ?9 where b.id = ?10")
        void updateBook(String name, Set<Author> authorList, String description, Set<Genre> genreList,
                        int total, int year, int pages, String file, String photo, int bookId);
}
