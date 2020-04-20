package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserSession;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSessionRepository extends CrudRepository<UserSession, Integer> {
}