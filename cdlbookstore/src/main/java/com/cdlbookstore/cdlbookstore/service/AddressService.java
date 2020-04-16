package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.AddressDto;
import com.cdlbookstore.cdlbookstore.entities.Address;

public interface AddressService {

    AddressDto getAddress(Integer id);
    AddressDto saveAddress(AddressDto addressDto);
}
