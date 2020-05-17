package com.bookstore.repositories;

import com.bookstore.entities.UserVote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserVoteRepository extends CrudRepository<UserVote, Integer> {
}
