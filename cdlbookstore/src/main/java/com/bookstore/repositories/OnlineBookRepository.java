package com.bookstore.repositories;

import com.bookstore.entities.OnlineBook;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OnlineBookRepository extends CrudRepository<OnlineBook, Integer> {
    List<OnlineBook> findByUserId(int userId);
    @Transactional
    void deleteByBookIdAndUserId(int bookId, int userId);
}
