package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserAccountDetailsDto;
import com.cdlbookstore.cdlbookstore.entities.UserAccountDetails;
import com.cdlbookstore.cdlbookstore.mapper.UserAccountDetailsMapper;
import com.cdlbookstore.cdlbookstore.repositories.UserAccountDetailsRepository;
import com.cdlbookstore.cdlbookstore.service.UserAccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAccountDetailsDetailsServiceImpl implements UserAccountDetailsService {

    @Autowired
    private UserAccountDetailsRepository userAccountDetailsRepository;

    @Autowired
    private UserAccountDetailsMapper userAccountDetailsMapper;

    @Override
    public UserAccountDetailsDto getUserAccountByEmail(String email) {
        UserAccountDetails userAccountDetails = userAccountDetailsRepository.findByEmail(email);
        return userAccountDetailsMapper.userAccountDetailsToUserAccountDetailsDto(userAccountDetails);
    }
}
