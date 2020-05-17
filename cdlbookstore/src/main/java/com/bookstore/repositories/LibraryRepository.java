package com.bookstore.repositories;

import com.bookstore.entities.Library;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibraryRepository extends CrudRepository<Library, Integer> {
    List<Library> findByUserId(int userId);
}
