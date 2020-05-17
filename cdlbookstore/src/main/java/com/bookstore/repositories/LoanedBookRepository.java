package com.bookstore.repositories;

import com.bookstore.entities.LoanedBook;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface LoanedBookRepository extends CrudRepository<LoanedBook, Integer> {
    List<LoanedBook> findByUserId(int userId);
    @Transactional
    void deleteByBookIdAndUserId(int bookId, int userId);

}
