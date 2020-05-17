package com.bookstore.repositories;

import com.bookstore.entities.UserVote;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface UserVoteRepository extends CrudRepository<UserVote, Integer> {
    UserVote getByBookIdAndAndUserId(int bookId, int userId);

    @Transactional
    @Modifying
    @Query("update UserVote u set u.rating = ?1 where u.bookId = ?2 and u.userId = ?3")
    void updateRating(int rating, int bookId, int userId);
}
