package com.bookstore.controller;

import com.bookstore.dto.AddressDto;
import com.bookstore.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/address/{id}")
    public ResponseEntity<AddressDto> getAddress(@PathVariable int id) {
        return addressService.getAddress(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
