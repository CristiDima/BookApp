package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.BookType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookTypeRepository extends CrudRepository<BookType, Integer> {
}
