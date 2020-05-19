package com.bookstore.repositories;

import com.bookstore.entities.BusinessCredentials;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BusinessCredentialsRepository extends CrudRepository<BusinessCredentials, Integer> {
    BusinessCredentials findByEmailAndPassword(String email, String password);

    BusinessCredentials findByEmail(String email);

    BusinessCredentials findByBusinessId(int businessId);

    @Transactional
    @Modifying
    @Query("update BusinessCredentials b set b.email = ?1 where b.id = ?2")
    void updateEmailByBusinessId(String email, Integer businessId);

    @Transactional
    @Modifying
    @Query("update BusinessCredentials b set b.password = ?1 where b.id = ?2")
    void updatePasswordByBusinessId(String password, Integer businessId);

}
