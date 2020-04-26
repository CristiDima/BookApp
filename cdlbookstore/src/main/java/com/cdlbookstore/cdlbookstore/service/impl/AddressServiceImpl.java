package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.AddressDto;
import com.cdlbookstore.cdlbookstore.entities.Address;
import com.cdlbookstore.cdlbookstore.mapper.AddressMapper;
import com.cdlbookstore.cdlbookstore.repositories.AddressRepository;
import com.cdlbookstore.cdlbookstore.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private AddressMapper addressMapper;

    @Override
    public Optional<AddressDto> getAddress(Integer id) {
        Address address = addressRepository.findById(id).orElse(null);
        return Optional.ofNullable(addressMapper.addressToAddressDto(address));
    }

    @Override
    public AddressDto saveAddress(AddressDto addressDto) {
        Address address = this.addressRepository.save(addressMapper.addressDtoToAddress(addressDto));
        return this.addressMapper.addressToAddressDto(address);
    }

    @Override
    public void updateAddressById(String address, String city, String district, Integer addressId) {
        addressRepository.updateAddressById(address, city, district, addressId);
    }
}
