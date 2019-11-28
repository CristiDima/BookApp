package cdl.cdlbookstore.controller;

import cdl.cdlbookstore.entities.Address;
import cdl.cdlbookstore.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping(path="/address")
    public Address getAddressDTO(){
        Address address = addressService.getAddress(1);
        return address;
    }
}
