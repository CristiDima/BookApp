package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserCredentialsDto;
import com.cdlbookstore.cdlbookstore.entities.UserCredentials;
import com.cdlbookstore.cdlbookstore.forms.LoginForm;
import com.cdlbookstore.cdlbookstore.mapper.UserCredentialsMapper;
import com.cdlbookstore.cdlbookstore.repositories.UserCredentialsRepository;
import com.cdlbookstore.cdlbookstore.service.UserCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCredentialsServiceImpl implements UserCredentialsService {

    @Autowired
    private UserCredentialsRepository userCredentialsRepository;

    @Autowired
    private UserCredentialsMapper userCredentialsMapper;

    @Override
    public UserCredentialsDto getUserAccountByCredentials(LoginForm loginForm) {
        UserCredentials userCredentials =  userCredentialsRepository.findByEmailAndPassword(loginForm.getUsername(), loginForm.getPassword());
        return userCredentialsMapper.userCredentialsToUserCredentialsDto(userCredentials);
    }

    @Override
    public UserCredentialsDto findUserByEmail(String email) {
        UserCredentials userCredentials = userCredentialsRepository.findByEmail(email);
        return userCredentialsMapper.userCredentialsToUserCredentialsDto(userCredentials);
    }

    @Override
    public void saveUserAccountDetails(UserCredentialsDto userCredentialsDto) {
        userCredentialsRepository.save(userCredentialsMapper.UserCredentialsDtoToUserCredentials(userCredentialsDto));
    }
}
