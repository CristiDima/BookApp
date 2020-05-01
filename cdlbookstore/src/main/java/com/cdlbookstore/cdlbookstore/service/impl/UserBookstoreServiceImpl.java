package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserBookstoreDto;
import com.cdlbookstore.cdlbookstore.entities.UserBookstore;
import com.cdlbookstore.cdlbookstore.mapper.UserBookstoreMapper;
import com.cdlbookstore.cdlbookstore.repositories.UserBookstoreRepository;
import com.cdlbookstore.cdlbookstore.service.AddressService;
import com.cdlbookstore.cdlbookstore.service.UserBookstoreService;
import com.cdlbookstore.cdlbookstore.service.UserCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class UserBookstoreServiceImpl implements UserBookstoreService {

    @Autowired
    private UserBookstoreRepository userBookstoreRepository;

    @Autowired
    private AddressService addressService;

    @Autowired
    private UserCredentialsService userCredentialsService;

    @Autowired
    private UserBookstoreMapper userBookstoreMapper;

    @Override
    public Optional<UserBookstoreDto> getUserById(int id) {
        UserBookstore userBookstore = userBookstoreRepository.findById(id).orElse(null);

        return Optional.ofNullable(userBookstoreMapper.userBookstoreToUserBookstoreDto(userBookstore));
    }

    @Override
    public UserBookstoreDto saveUser(UserBookstoreDto userBookstoreDto) {
        UserBookstore userBookstore = userBookstoreRepository.save(userBookstoreMapper.userBookstoreDtoToUserBookstore(userBookstoreDto));

        return userBookstoreMapper.userBookstoreToUserBookstoreDto(userBookstore);
    }

    @Override
    public void updateUserInfoById(String firstName, String lastName, String phoneNumber, Integer userId) {
        userBookstoreRepository.updateUserInfoById(firstName, lastName, phoneNumber, userId);
    }

    @Override
    public Optional<Map<String, String>> updateUser(int userId, Map<String, String> userDetails) {
        if (userDetails.get("address") == null || userDetails.get("city") == null && userDetails.get("district") == null) {
            Optional.ofNullable(null);
        }

        if(userDetails.get("firstName") == null || userDetails.get("lastName") == null || userDetails.get("phoneNumber") == null) {
            Optional.ofNullable(null);
        }

        if(userDetails.get("email") == null) {
            Optional.ofNullable(null);
        }

        UserBookstoreDto userBookstoreDto = getUserById(userId).orElse(null);
        if (userBookstoreDto == null) {
            Optional.ofNullable(null);
        }

        this.updateUserInfoById(userDetails.get("firstName") , userDetails.get("lastName"),
                userDetails.get("phoneNumber"), userId);

        addressService.updateAddressById(userDetails.get("address"), userDetails.get("city"),
                userDetails.get("district"), userBookstoreDto.getAddressId());

        userCredentialsService.updateEmailByUserId(userDetails.get("email"), userId);

        return Optional.ofNullable(userDetails);
    }
}