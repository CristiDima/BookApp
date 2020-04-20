package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.dto.OnlineBookDto;
import com.cdlbookstore.cdlbookstore.entities.OnlineBook;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OnlineBookRepository extends CrudRepository<OnlineBook, Integer> {
    List<OnlineBook> findByUserId(int userId);
}
