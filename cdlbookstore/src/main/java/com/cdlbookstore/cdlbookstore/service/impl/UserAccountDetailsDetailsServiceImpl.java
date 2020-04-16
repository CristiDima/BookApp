package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserAccountDetailsDto;
import com.cdlbookstore.cdlbookstore.entities.UserAccountDetails;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;
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
    public UserAccountDetailsDto getUserAccountByCredentials(LoginForm loginForm) {
        UserAccountDetails userAccountDetails =
                userAccountDetailsRepository.findByEmailAndPassword(loginForm.getUsername(), loginForm.getPassword()).get();
        return userAccountDetailsMapper.userAccountDetailsToUserAccountDetailsDto(userAccountDetails);
    }

    @Override
    public UserAccountDetailsDto findUserByEmail(String email) {
        UserAccountDetails userAccountDetails = null;
        try {
            userAccountDetails = userAccountDetailsRepository.findByEmail(email).get();
        } catch (Exception e) {
            return null;
        }
        return userAccountDetailsMapper.userAccountDetailsToUserAccountDetailsDto(userAccountDetails);
    }

    @Override
    public void saveUserAccountDetails(UserAccountDetailsDto userAccountDetailsDto) {
        userAccountDetailsRepository.save(userAccountDetailsMapper.userAccountDetailsDtoToUserAccountDetails(userAccountDetailsDto));
    }
}
