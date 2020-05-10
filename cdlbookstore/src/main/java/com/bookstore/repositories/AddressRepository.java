package com.bookstore.repositories;

import com.bookstore.entities.Address;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AddressRepository extends CrudRepository<Address, Integer> {

    @Transactional
    @Modifying
    @Query("update Address a set a.address = ?1, a.city = ?2, a.district = ?3 where a.id = ?4")
    void updateAddressById(String address, String city, String district, Integer addressId);
}
