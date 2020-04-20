package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.LoanedBook;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanedBookRepository extends CrudRepository<LoanedBook, Integer> {
    List<LoanedBook> findByUserId(int userId);
}
