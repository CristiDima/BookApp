package com.bookstore.service.impl;

import com.bookstore.dto.AddressDto;
import com.bookstore.dto.BusinessCredentialsDto;
import com.bookstore.dto.BusinessDto;
import com.bookstore.entities.Address;
import com.bookstore.entities.Business;
import com.bookstore.entities.BusinessCredentials;
import com.bookstore.mapper.AddressMapper;
import com.bookstore.mapper.BusinessCredentialsMapper;
import com.bookstore.mapper.BusinessMapper;
import com.bookstore.repositories.BusinessRepository;
import com.bookstore.service.AddressService;
import com.bookstore.service.BusinessCredentialsService;
import com.bookstore.service.BusinessService;
import com.bookstore.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class BusinessServiceImpl implements BusinessService {

    @Autowired
    BusinessCredentialsService businessCredentialsService;

    @Autowired
    AddressService addressService;

    @Autowired
    EmailService emailService;

    @Autowired
    BusinessRepository businessRepository;

    @Autowired
    BusinessCredentialsMapper businessCredentialsMapper;

    @Autowired
    AddressMapper addressMapper;

    @Autowired
    BusinessMapper businessMapper;

    @Override
    public Optional<Map<String, String>> signUp(Map<String, String> userDetails) {
        BusinessCredentialsDto businessCredentialsDto = businessCredentialsService.findUserByEmail(userDetails.get("email"));

        if (userDetails.get("email") != null && businessCredentialsDto != null) {
            return Optional.ofNullable(null);
        }

        if (userDetails.get("address") == null || userDetails.get("city") == null && userDetails.get("district") == null) {
            return Optional.ofNullable(null);
        }

        if(userDetails.get("businessName") == null || userDetails.get("phoneNumber") == null) {
            return Optional.ofNullable(null);
        }

        if( userDetails.get("password") == null) {
            return Optional.ofNullable(null);
        }

        AddressDto addressDto = null;
        Address address = new Address();
        address.setAddress(userDetails.get("address"));
        address.setCity(userDetails.get("city"));
        address.setDistrict(userDetails.get("district"));
        addressDto = addressService.saveAddress(addressMapper.addressToAddressDto(address));

        BusinessDto businessDto = null;
        Business business = new Business();
        business.setCompanyName(userDetails.get("businessName"));
        business.setPhoneNumber(userDetails.get("phoneNumber"));
        business.setAddressId(addressDto.getId());
        businessDto = businessMapper.businessToBusinessDto(businessRepository.save(business));

        BusinessCredentials businessCredentials = new BusinessCredentials();
        businessCredentials.setBusinessId(businessDto.getId());
        businessCredentials.setEmail(userDetails.get("email"));
        businessCredentials.setPassword(userDetails.get("password"));
        businessCredentialsService.
                saveBusinessAccountDetails(businessCredentialsMapper.businessCredentialsToBusinessCredentialsDto(businessCredentials));
        emailService.sendCreateAccountEmail(businessCredentials.getEmail(), business.getCompanyName());
        return Optional.ofNullable(userDetails);
    }
}
