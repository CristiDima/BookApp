package com.bookstore.service.impl;

import com.bookstore.entities.Address;
import com.bookstore.service.AddressService;
import com.bookstore.dto.AddressDto;
import com.bookstore.mapper.AddressMapper;
import com.bookstore.repositories.AddressRepository;
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
