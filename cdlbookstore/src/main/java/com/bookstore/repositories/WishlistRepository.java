package com.bookstore.repositories;

import com.bookstore.entities.Wishlist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface WishlistRepository extends CrudRepository<Wishlist, Integer> {
    @Transactional
    void deleteByBookIdAndUserId(int bookId, int userId);
    List<Wishlist> findByUserId(int userId);
}
