package com.bookstore.service;

import com.bookstore.dto.AddressDto;

import java.util.Optional;

public interface AddressService {

    Optional<AddressDto> getAddress(Integer id);
    AddressDto saveAddress(AddressDto addressDto);
    void updateAddressById(String address, String city, String district, Integer addressId);
}
