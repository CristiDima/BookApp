package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.AddressDto;
import com.cdlbookstore.cdlbookstore.entities.Address;
import com.cdlbookstore.cdlbookstore.mapper.AddressMapper;
import com.cdlbookstore.cdlbookstore.repositories.AddressRepository;
import com.cdlbookstore.cdlbookstore.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AddressMapper addressMapper;

    @Override
    public AddressDto getAddress(Integer id) {
        Address address = addressRepository.findById(id).get();
        return addressMapper.addressToAddressDto(address);
    }

    @Override
    public AddressDto saveAddress(AddressDto addressDto) {
        Address address = this.addressRepository.save(addressMapper.addressDtoToAddress(addressDto));
        return this.addressMapper.addressToAddressDto(address);
    }
}
