package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.AddressDto;
import com.cdlbookstore.cdlbookstore.dto.UserBookstoreDto;
import com.cdlbookstore.cdlbookstore.dto.UserCredentialsDto;
import com.cdlbookstore.cdlbookstore.dto.UserSessionDto;
import com.cdlbookstore.cdlbookstore.entities.Address;
import com.cdlbookstore.cdlbookstore.entities.UserBookstore;
import com.cdlbookstore.cdlbookstore.entities.UserCredentials;
import com.cdlbookstore.cdlbookstore.entities.UserSession;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;
import com.cdlbookstore.cdlbookstore.mapper.AddressMapper;
import com.cdlbookstore.cdlbookstore.mapper.UserBookstoreMapper;
import com.cdlbookstore.cdlbookstore.mapper.UserCredentialsMapper;
import com.cdlbookstore.cdlbookstore.mapper.UserSessionMapper;
import com.cdlbookstore.cdlbookstore.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    UserCredentialsService userCredentialsService;

    @Autowired
    AddressService addressService;

    @Autowired
    UserBookstoreService userBookstoreService;

    @Autowired
    EmailService emailService;

    @Autowired
    UserSessionService userSessionService;

    @Autowired
    UserCredentialsMapper userCredentialsMapper;

    @Autowired
    AddressMapper addressMapper;

    @Autowired
    UserBookstoreMapper userBookstoreMapper;

    @Autowired
    UserSessionMapper userSessionMapper;

    @Override
    public Optional<Map<String, Object>> login(LoginForm loginForm) {
        UserCredentialsDto userCredentialsDto = userCredentialsService.getUserAccountByCredentials(loginForm);
        if (userCredentialsDto != null) {
            UUID token = UUID.randomUUID();
            UserSession userSession = new UserSession();
            UserBookstoreDto userBookstoreDto = userBookstoreService.getUserById(userCredentialsDto.getId()).orElse(null);
            if (userBookstoreDto != null) {
                userSession.setUserId(userBookstoreDto.getId());
                userSession.setCreated(new Date());
                userSession.setToken(token.toString());
                userSessionService.saveUserSession(userSessionMapper.userSessionToUserSessionDto(userSession));
            }

            Map<String, Object> userDetails = new HashMap<String, Object>();
            userDetails.put("user", userBookstoreDto);
            userDetails.put("token", userSession.getToken());
            return Optional.ofNullable(userDetails);
        }
        return Optional.ofNullable(null);
    }

    @Override
    public Optional<UserSessionDto> logout(String token) {
        UserSessionDto userSessionDto = userSessionService.findUserSessionByToken(token);
        if (userSessionDto != null) {
            userSessionDto.setValid(false);
            userSessionService.updateUserSession(userSessionDto.isValid(), userSessionDto.getUserId());
            return Optional.ofNullable(userSessionDto);
        }
        return Optional.ofNullable(null);
    }

    @Override
    public Optional<Map<String, String>> signUp(Map<String, String> userDetails) {
        UserCredentialsDto userCredentialsDto = userCredentialsService.findUserByEmail(userDetails.get("email"));

        if (userDetails.get("email") != null && userCredentialsDto != null) {
            return Optional.ofNullable(null);
        }

        if (userDetails.get("address") == null || userDetails.get("city") == null && userDetails.get("district") == null) {
            return Optional.ofNullable(null);
        }

        if(userDetails.get("firstName") == null || userDetails.get("lastName") == null || userDetails.get("phoneNumber") == null) {
            return Optional.ofNullable(null);
        }

        if(userDetails.get("email") == null || userDetails.get("password") == null) {
            return Optional.ofNullable(null);
        }

        AddressDto addressDto = null;
        Address address = new Address();
        address.setAddress(userDetails.get("address"));
        address.setCity(userDetails.get("city"));
        address.setDistrict(userDetails.get("district"));
        addressDto = addressService.saveAddress(addressMapper.addressToAddressDto(address));

        UserBookstoreDto userBookstoreDto = null;
        UserBookstore userBookstore = new UserBookstore();
        userBookstore.setAdmin(false);
        userBookstore.setFirstName(userDetails.get("firstName"));
        userBookstore.setLastName(userDetails.get("lastName"));
        userBookstore.setPhoneNumber(userDetails.get("phoneNumber"));
        userBookstore.setAddressId(addressDto.getId());
        userBookstoreDto = userBookstoreService.saveUser(userBookstoreMapper.userBookstoreToUserBookstoreDto(userBookstore));

        UserCredentials userCredentials = new UserCredentials();
        userCredentials.setUserId(userBookstoreDto.getId());
        userCredentials.setEmail(userDetails.get("email"));
        userCredentials.setPassword(userDetails.get("password"));
        userCredentialsService.saveUserAccountDetails(userCredentialsMapper.userCredentialsToUserCredentialsDto(userCredentials));
        emailService.sendCreateAccountEmail(userCredentials.getEmail());
        return Optional.ofNullable(userDetails);
    }

    @Override
    public Optional<String> resetPassword(String email) {
        UserCredentialsDto userCredentialsDto = userCredentialsService.findUserByEmail(email);

        if (userCredentialsDto == null) {
            return Optional.ofNullable(null);
        }

        emailService.resetPasswordEmail(email);

        return Optional.ofNullable(email);
    }

    @Override
    public Optional<String> heartbeat(String token) {
        UserSessionDto userSessionDto = userSessionService.findUserSessionByToken(token);
        if (userSessionDto == null) {
            return Optional.ofNullable(null);
        }

        if (userSessionDto.getCreated().before(new Date())) {
            userSessionDto.setValid(false);
            userSessionService.updateUserSession(userSessionDto.isValid(), userSessionDto.getUserId());
            return Optional.ofNullable(null);
        }

        userSessionService.updateUserSession(new Date(), userSessionDto.getUserId());
        return Optional.ofNullable(token);
    }

}
