package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.AddressDto;
import com.cdlbookstore.cdlbookstore.entities.Address;
import com.cdlbookstore.cdlbookstore.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/address")
    public AddressDto getAddress()
    {
        return addressService.getAddress(1);
    }
}
