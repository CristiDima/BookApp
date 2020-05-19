package com.bookstore.service.impl;

import com.bookstore.dto.UserBookstoreDto;
import com.bookstore.entities.UserBookstore;
import com.bookstore.mapper.UserBookstoreMapper;
import com.bookstore.repositories.UserBookstoreRepository;
import com.bookstore.service.AddressService;
import com.bookstore.service.UserBookstoreService;
import com.bookstore.service.UserCredentialsService;
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
    public UserBookstoreDto getByCompanyName(String businessName) {
        UserBookstore userBookstore = userBookstoreRepository.findByCompanyName(businessName);
        return userBookstoreMapper.userBookstoreToUserBookstoreDto(userBookstore);
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
