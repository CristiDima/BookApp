package com.bookstore.repositories;

import com.bookstore.entities.UserBookstore;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserBookstoreRepository extends CrudRepository<UserBookstore, Integer> {

    UserBookstore findByCompanyName(String companyName);

    @Transactional
    @Modifying
    @Query("update UserBookstore u set u.firstName = ?1, u.lastName = ?2, u.phoneNumber = ?3 where u.id = ?4")
    void updateUserInfoById(String firstName, String lastName, String phoneNumber, Integer userId);
}
