package com.bookstore.repositories;

import com.bookstore.entities.UserCredentials;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserCredentialsRepository extends CrudRepository<UserCredentials, Integer> {

    UserCredentials findByEmailAndPassword(String email, String password);

    UserCredentials findByEmail(String email);

    UserCredentials findByUserId(int userId);

    @Transactional
    @Modifying
    @Query("update UserCredentials u set u.email = ?1 where u.id = ?2")
    void updateEmailByUserId(String email, Integer userId);

    @Transactional
    @Modifying
    @Query("update UserCredentials u set u.password = ?1 where u.id = ?2")
    void updatePasswordByUserId(String password, Integer userId);
}
