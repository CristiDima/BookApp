package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserSession;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface UserSessionRepository extends CrudRepository<UserSession, Integer> {
    UserSession findByToken(String token);
    @Transactional
    @Modifying
    @Query("update UserSession u set u.isValid = ?1 where u.userId = ?2")
    void updateUserSession(boolean isValid, Integer userId);

    @Transactional
    @Modifying
    @Query("update UserSession u set u.created = ?1 where u.userId = ?2")
    void updateUserSession(Date createdAt, Integer userId);
}
