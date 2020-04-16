package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.AddressDto;
import com.cdlbookstore.cdlbookstore.dto.UserAccountDetailsDto;
import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.entities.Address;
import com.cdlbookstore.cdlbookstore.entities.UserAccountDetails;
import com.cdlbookstore.cdlbookstore.entities.UserBookster;
import com.cdlbookstore.cdlbookstore.entities.UserSession;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;
import com.cdlbookstore.cdlbookstore.mapper.AddressMapper;
import com.cdlbookstore.cdlbookstore.mapper.UserAccountDetailsMapper;
import com.cdlbookstore.cdlbookstore.mapper.UserBooksterMapper;
import com.cdlbookstore.cdlbookstore.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    UserAccountDetailsService userAccountDetailsService;

    @Autowired
    AddressService addressService;

    @Autowired
    UserBooksterService userBooksterService;

    @Autowired
    EmailService emailService;

    @Autowired
    UserAccountDetailsMapper userAccountDetailsMapper;

    @Autowired
    AddressMapper addressMapper;

    @Autowired
    UserBooksterMapper userBooksterMapper;

    @Override
    public Map<String, Object> login(LoginForm loginForm) {
        UserAccountDetailsDto userAccountDetailsDto =  userAccountDetailsService.getUserAccountByCredentials(loginForm);
        if (userAccountDetailsDto != null) {
            UUID token = UUID.randomUUID();
            UserBooksterDto userBooksterDto = userBooksterService.getUserById(userAccountDetailsDto.getId());
            AddressDto addressDto = addressService.getAddress(userBooksterDto.getId());
            Map<String, Object> userDetails = new HashMap<String, Object>();
            userDetails.put("user", userBooksterDto);
            userDetails.put("address", addressDto);
            return  userDetails;
        }
        return null;
    }

    @Override
    public ResponseEntity signup(Map<String, String> userDetails) {
        UserAccountDetailsDto userAccountDetailsDto = userAccountDetailsService.findUserByEmail(userDetails.get("email"));

        if (userDetails.get("email") != null && userAccountDetailsDto != null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("An account with this email address already exist");
        }

        if (userDetails.get("address") == null || userDetails.get("city") == null && userDetails.get("district") == null) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("User fields are empty");
        }

        if(userDetails.get("firstname") == null || userDetails.get("lastname") == null) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("User fields are empty");
        }

        if(userDetails.get("email") == null || userDetails.get("password") == null) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("User fields are empty");
        }

        AddressDto addressDto = null;
        Address address = new Address();
        address.setAddress(userDetails.get("address"));
        address.setCity(userDetails.get("city"));
        address.setDistrict(userDetails.get("district"));
        addressDto = addressService.saveAddress(addressMapper.addressToAddressDto(address));

        UserBooksterDto userBooksterDto = null;
        UserBookster userBookster = new UserBookster();
        userBookster.setAdmin(false);
        userBookster.setFirstName(userDetails.get("firstname"));
        userBookster.setLastName(userDetails.get("lastname"));
        userBookster.setAddressId(addressDto.getId());
        userBooksterDto = userBooksterService.saveUser(userBooksterMapper.userBooksterToUserBooksterDto(userBookster));

        UserAccountDetails userAccountDetails = new UserAccountDetails();
        userAccountDetails.setUserId(userBooksterDto.getId());
        userAccountDetails.setEmail(userDetails.get("email"));
        userAccountDetails.setPassword(userDetails.get("password"));
        userAccountDetailsService.saveUserAccountDetails(userAccountDetailsMapper.userAccountDetailsToUserAccountDetailsDto(userAccountDetails));
        emailService.sendCreateAccountEmail(userAccountDetails.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body("The account was created");
    }

    @Override
    public ResponseEntity resetPassword(String email) {
        UserAccountDetailsDto userAccountDetailsDto = userAccountDetailsService.findUserByEmail(email);

        if (userAccountDetailsDto == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Is not any account with this email");
        }

        emailService.resetPasswordEmail(email);

        return ResponseEntity.status(HttpStatus.CREATED).body("An email to reset your password was send to the email: " + email);
    }
}
