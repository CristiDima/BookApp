package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.entities.UserBookster;
import com.cdlbookstore.cdlbookstore.entities.UserCredentials;
import com.cdlbookstore.cdlbookstore.mapper.UserBooksterMapper;
import com.cdlbookstore.cdlbookstore.repositories.AddressRepository;
import com.cdlbookstore.cdlbookstore.repositories.UserBooksterRepository;
import com.cdlbookstore.cdlbookstore.repositories.UserCredentialsRepository;
import com.cdlbookstore.cdlbookstore.service.AddressService;
import com.cdlbookstore.cdlbookstore.service.UserBooksterService;
import com.cdlbookstore.cdlbookstore.service.UserCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserBooksterServiceImpl implements UserBooksterService {

    @Autowired
    private UserBooksterRepository userBooksterRepository;

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserCredentialsService userCredentialsService;

    @Autowired
    private UserBooksterMapper userBooksterMapper;

    @Override
    public UserBooksterDto getUserById(int id) {
        UserBookster userBookster = userBooksterRepository.findById(id).get();

        return userBooksterMapper.userBooksterToUserBooksterDto(userBookster);
    }

    @Override
    public UserBooksterDto saveUser(UserBooksterDto userBooksterDto) {
        UserBookster userBookster = userBooksterRepository.save(userBooksterMapper.userBooksterDtoToUserBookster(userBooksterDto));

        return userBooksterMapper.userBooksterToUserBooksterDto(userBookster);
    }

    @Override
    public void updateUserInfoById(String firstName, String lastName, String phoneNumber, Integer userId) {
        userBooksterRepository.updateUserInfoById(firstName, lastName, phoneNumber, userId);
    }

    @Override
    public Map<String, String> updateUser(int userId, Map<String, String> userDetails) throws Exception {
        if (userDetails.get("address") == null || userDetails.get("city") == null && userDetails.get("district") == null) {
            throw new Exception("User fields are incorrect");
        }

        if(userDetails.get("firstName") == null || userDetails.get("lastName") == null || userDetails.get("phoneNumber") == null) {
            throw new Exception("User fields are incorrect");
        }

        if(userDetails.get("email") == null) {
            throw new Exception("User fields are incorrect");
        }

        UserBooksterDto userBooksterDto = this.getUserById(userId);
        if (userBooksterDto == null) {
            throw new Exception("User fields are incorrect");
        }

        this.updateUserInfoById(userDetails.get("firstName") , userDetails.get("lastName"),
                userDetails.get("phoneNumber"), userId);

        addressService.updateAddressById(userDetails.get("address"), userDetails.get("city"),
                userDetails.get("district"), userBooksterDto.getAddressId());

        userCredentialsService.updateEmailByUserId(userDetails.get("email"), userId);

        return userDetails;
    }
}
