package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserOnlineAccount;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface UserOnlineAccountRepository extends CrudRepository<UserOnlineAccount, Integer> {
//    @Transactional
//    @Query("select u from UserOnlineAccount u where u.userId = ?1 and u.isValid = true")
    UserOnlineAccount findByUserId(int userId);

    @Transactional
    @Modifying
    @Query("update UserOnlineAccount u set u.activatedAt = ?1, u.expiresAt = ?2, u.isValid = ?3 where u.userId = ?4")
    void updateUserOnlineAccount(Date activatedAt, Date expiresAt, boolean isActive, Integer userId);

    @Transactional
    @Modifying
    @Query("update UserOnlineAccount u set u.isValid = ?1 where u.userId = ?2")
    void updateUserOnlineAccount(boolean isActive, Integer userId);
}
