package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserCredentials;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCredentialsRepository extends CrudRepository<UserCredentials, Integer> {
    Optional<UserCredentials> findByEmailAndPassword(String email, String password);
    Optional<UserCredentials> findByEmail(String email);
}
