package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserAccountDetails;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountDetailsRepository extends CrudRepository<UserAccountDetails, Integer> {
    UserAccountDetails findByEmail(String email);
}
