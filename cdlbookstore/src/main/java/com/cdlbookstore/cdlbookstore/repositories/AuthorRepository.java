package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.Author;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Integer> {
}
