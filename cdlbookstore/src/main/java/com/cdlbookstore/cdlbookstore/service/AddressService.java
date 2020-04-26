package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.AddressDto;
import com.cdlbookstore.cdlbookstore.entities.Address;

import java.util.Optional;

public interface AddressService {

    Optional<AddressDto> getAddress(Integer id);
    AddressDto saveAddress(AddressDto addressDto);
    void updateAddressById(String address, String city, String district, Integer addressId);
}
