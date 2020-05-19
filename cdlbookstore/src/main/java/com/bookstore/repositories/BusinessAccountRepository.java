package com.bookstore.repositories;

import com.bookstore.entities.BusinessAccount;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessAccountRepository extends CrudRepository<BusinessAccount, Integer> {
}
