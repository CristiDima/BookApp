package com.bookstore.repositories;

import com.bookstore.entities.BusinessAccount;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface BusinessAccountRepository extends CrudRepository<BusinessAccount, Integer> {

    BusinessAccount findByUserId(int userId);

    @Transactional
    @Modifying
    @Query("update BusinessAccount b set b.activatedAt = ?1, b.expiresAt = ?2, b.isValid = ?3 where b.userId = ?4")
    void updateBusinessAccount(Date activatedAt, Date expiresAt, boolean isActive, Integer userId);

    @Transactional
    @Modifying
    @Query("update BusinessAccount b set b.isValid = ?1 where b.userId = ?2")
    void updateBusinessAccount(boolean isActive, Integer userId);
}
