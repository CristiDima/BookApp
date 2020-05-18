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
    List<LoanedBook> findByReturnedTrue();
    List<LoanedBook> findByOrderedTrueAndDeliveredFalse();
    List<LoanedBook> findByDeliveredTrueAndReturnedFalse();
    LoanedBook findByBookIdAndUserId(int bookId, int userId);

    @Transactional
    @Modifying
    @Query("update LoanedBook l set l.delivered = ?1 where l.bookId = ?2 and l.userId = ?3")
    void updateLoanedBooks(boolean delivered, int bookId, int userId);


    @Transactional
    @Modifying
    @Query("update LoanedBook l set l.returned = ?1 where l.bookId = ?2 and l.userId = ?3")
    void updateReturnedBook(boolean returned, int bookId, int userId);


    @Transactional
    void deleteByBookIdAndUserId(int bookId, int userId);


}
