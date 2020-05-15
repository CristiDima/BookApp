package com.bookstore.repositories;

import com.bookstore.entities.Book;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {
    @Transactional
    @Modifying
    @Query("update Book b set b.rating = ?1, b.votes = ?2 where b.id = ?3")
    void updateBookRating(Double rating, Double votes, Integer bookId);
}
