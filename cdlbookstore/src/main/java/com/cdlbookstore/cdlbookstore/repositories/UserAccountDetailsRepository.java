package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserAccountDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountDetailsRepository extends CrudRepository<UserAccountDetails, Integer> {
    Optional<UserAccountDetails> findByEmailAndPassword(String email, String password);
    Optional<UserAccountDetails> findByEmail(String email);
}
