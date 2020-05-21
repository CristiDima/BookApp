package com.bookstore.repositories;

import com.bookstore.entities.Employees;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface EmployeesRepository extends CrudRepository<Employees, Integer> {
    List<Employees> findByBusinessId(int businessId);
    Employees findByEmail(String email);

    @Transactional
    void deleteByEmail(String email);
}
