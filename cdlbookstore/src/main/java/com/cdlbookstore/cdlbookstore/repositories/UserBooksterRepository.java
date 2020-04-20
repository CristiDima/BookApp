package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserBookster;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserBooksterRepository extends CrudRepository<UserBookster, Integer> {

    @Transactional
    @Modifying
    @Query("update UserBookster u set u.firstName = ?1, u.lastName = ?2, u.phoneNumber = ?3 where u.id = ?4")
    void updateUserInfoById(String firstName, String lastName, String phoneNumber, Integer userId);
}
