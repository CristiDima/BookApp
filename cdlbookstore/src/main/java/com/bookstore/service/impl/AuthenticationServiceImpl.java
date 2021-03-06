package com.bookstore.service.impl;

import com.bookstore.dto.*;
import com.bookstore.entities.Address;
import com.bookstore.entities.UserBookstore;
import com.bookstore.entities.UserCredentials;
import com.bookstore.entities.UserSession;
import com.bookstore.service.*;
import com.bookstore.forms.LoginForm;
import com.bookstore.mapper.AddressMapper;
import com.bookstore.mapper.UserBookstoreMapper;
import com.bookstore.mapper.UserCredentialsMapper;
import com.bookstore.mapper.UserSessionMapper;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private final static int SESSION_LIFETIME = 60;
    private final static int NUMBER_OF_BOOKS = 5;

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
    UserResetPasswordService userResetPasswordService;

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

        if ((userDetails.get("address") == null || userDetails.get("city") == null && userDetails.get("district") == null) &&
                userDetails.get("is_from_business") == null) {
            return Optional.ofNullable(null);
        }

        if((userDetails.get("firstName") == null || userDetails.get("lastName") == null) && userDetails.get("companyName") == null ) {
            return Optional.ofNullable(null);
        }

        if(userDetails.get("email") == null || userDetails.get("password") == null || userDetails.get("phoneNumber") == null) {
            return Optional.ofNullable(null);
        }

        AddressDto addressDto = null;
        UserBookstoreDto userBookstoreDto = null;
        UserBookstore userBookstore = new UserBookstore();
        if (userDetails.get("is_from_business") == null) {
            Address address = new Address();
            address.setAddress(userDetails.get("address"));
            address.setCity(userDetails.get("city"));
            address.setDistrict(userDetails.get("district"));
            addressDto = addressService.saveAddress(addressMapper.addressToAddressDto(address));
            userBookstore.setAddressId(addressDto.getId());
        } else {
            userBookstore.setFromBusiness(true);
            UserBookstoreDto tempUserBookstore
                    = userBookstoreService.getUserById(Integer.parseInt(userDetails.get("companyId"))).orElse(null);
            userBookstore.setAddressId(tempUserBookstore.getAddressId());
            userBookstore.setCompanyName(tempUserBookstore.getCompanyName());
        }

        if (userDetails.get("isAdmin") == null) {
            userBookstore.setAdmin(false);
        } else {
            userBookstore.setAdmin(true);
        }

        if (userDetails.get("firstName") != null || userDetails.get("lastName") != null) {
            userBookstore.setFirstName(userDetails.get("firstName"));
            userBookstore.setLastName(userDetails.get("lastName"));
        } else if (userDetails.get("companyName") != null) {
            userBookstore.setCompanyName(userDetails.get("companyName"));
            userBookstore.setBusiness(true);
        }

        userBookstore.setPhoneNumber(userDetails.get("phoneNumber"));
        userBookstore.setTotalBooks(NUMBER_OF_BOOKS);
        userBookstoreDto = userBookstoreService.saveUser(userBookstoreMapper.userBookstoreToUserBookstoreDto(userBookstore));

        UserCredentials userCredentials = new UserCredentials();
        userCredentials.setUserId(userBookstoreDto.getId());
        userCredentials.setEmail(userDetails.get("email"));
        userCredentials.setPassword(userDetails.get("password"));
        userCredentialsService.saveUserAccountDetails(userCredentialsMapper.userCredentialsToUserCredentialsDto(userCredentials));
        String name = "";
        if (userBookstoreDto.getFirstName() != null && userBookstoreDto.getLastName() != null) {
            name = userBookstoreDto.getFirstName() + " " + userBookstoreDto.getLastName();
        } else if (userBookstoreDto.getCompanyName() != null){
            name = userBookstoreDto.getCompanyName();
        }

        emailService.sendCreateAccountEmail(userCredentials.getEmail(), name);
        return Optional.ofNullable(userDetails);
    }

    @Override
    public Optional<String> resetPassword(String email) {
        UserCredentialsDto userCredentialsDto = userCredentialsService.findUserByEmail(email);

        if (userCredentialsDto == null) {
            return Optional.ofNullable(null);
        }

        UserBookstoreDto userBookstoreDto = userBookstoreService.getUserById(userCredentialsDto.getUserId()).orElse(null);
        UserResetPasswordDto userResetPasswordDto = userResetPasswordService.setResetPassToken(userBookstoreDto.getId());
        String link = "http://localhost:4200/new-password" + "?token=" + userResetPasswordDto.getToken() +
                "&id=" + userBookstoreDto.getId();
        emailService.resetPasswordEmail(email, userBookstoreDto.getLastName(), link);

        return Optional.ofNullable(userCredentialsDto.getEmail());
    }

    @Override
    public Optional<String> heartbeat(String token) {
        UserSessionDto userSessionDto = userSessionService.findUserSessionByToken(token);
        if (userSessionDto == null) {
            return Optional.ofNullable(null);
        }
        Date currentDate = new Date();
        Date targetTime = DateUtils.addMinutes(userSessionDto.getCreated(), SESSION_LIFETIME);
        if (targetTime.compareTo(currentDate) < 0) {
            userSessionDto.setValid(false);
            userSessionService.updateUserSession(userSessionDto.isValid(), userSessionDto.getUserId());
            return Optional.ofNullable(null);
        }

        userSessionService.updateUserSession(new Date(), userSessionDto.getUserId());
        return Optional.ofNullable(token);
    }

    @Override
    public Optional<Boolean> isTokenValid(int userId, String token) {
        UserResetPasswordDto userResetPasswordDto = userResetPasswordService.getResetPassToken(userId, token);

        if (userResetPasswordDto.getExpiresAt().after(new Date())) {
            return Optional.ofNullable(true);
        }

        return Optional.ofNullable(true);
    }

    @Override
    public Optional<Boolean> changePassword(Map<String, Object> userDetails) {
        if (userDetails == null || userDetails.get("password") == null || userDetails.get("userId") == null) {
            return Optional.ofNullable(false);
        }

        int userId = Integer.parseInt((String) userDetails.get("userId"));
        String password = (String) userDetails.get("password");
        UserCredentialsDto userCredentialsDto = userCredentialsService.findUserByUserId(userId);
        if (userCredentialsDto == null) {
            Optional.ofNullable(false);
        }
        userCredentialsDto.setPassword(password);
        userCredentialsService.updatePasswordByUserId(userCredentialsDto.getPassword(), userCredentialsDto.getUserId());
        return Optional.ofNullable(true);
    }

}
