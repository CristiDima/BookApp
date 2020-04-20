package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserPhysicalAccount;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface UserPhysicalAccountRepository extends CrudRepository<UserPhysicalAccount, Integer> {
    UserPhysicalAccount findByUserId(int userId);

    @Transactional
    @Modifying
    @Query("update UserPhysicalAccount u set u.activatedAt = ?1, u.expiresAt = ?2, u.isValid = ?3 where u.userId = ?4")
    void updateUserPhysicalAccount(Date activatedAt, Date expiresAt, boolean isActive, Integer userId);

    @Transactional
    @Modifying
    @Query("update UserPhysicalAccount u set u.isValid = ?1 where u.userId = ?2")
    void updateUserPhysicalAccount(boolean isActive, Integer userId);
}
