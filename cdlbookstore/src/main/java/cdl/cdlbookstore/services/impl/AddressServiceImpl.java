package cdl.cdlbookstore.services.impl;

import cdl.cdlbookstore.entities.Address;
import cdl.cdlbookstore.repository.AddressRepository;
import cdl.cdlbookstore.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Address getAddress(int id) {
        addressRepository.findAll();
        return addressRepository.findAddressById( id );
    }
}
