package com.bookstore.service.impl;

import com.bookstore.dto.UserCredentialsDto;
import com.bookstore.entities.UserCredentials;
import com.bookstore.forms.LoginForm;
import com.bookstore.mapper.UserCredentialsMapper;
import com.bookstore.repositories.UserCredentialsRepository;
import com.bookstore.service.UserCredentialsService;
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
        UserCredentials userCredentials
                = userCredentialsRepository.findByEmailAndPassword(loginForm.getUsername(), loginForm.getPassword());
        return userCredentialsMapper.userCredentialsToUserCredentialsDto(userCredentials);
    }

    @Override
    public UserCredentialsDto findUserByEmail(String email) {
        UserCredentials userCredentials = userCredentialsRepository.findByEmail(email);
        return userCredentialsMapper.userCredentialsToUserCredentialsDto(userCredentials);
    }

    @Override
    public UserCredentialsDto findUserByUserId(int userId) {
        UserCredentials userCredentials = userCredentialsRepository.findByUserId(userId);
        return userCredentialsMapper.userCredentialsToUserCredentialsDto(userCredentials);
    }

    @Override
    public void saveUserAccountDetails(UserCredentialsDto userCredentialsDto) {
        userCredentialsRepository.save(userCredentialsMapper.UserCredentialsDtoToUserCredentials(userCredentialsDto));
    }

    @Override
    public void updateEmailByUserId(String email, Integer userId) {
        userCredentialsRepository.updateEmailByUserId(email, userId);
    }

    @Override
    public void updatePasswordByUserId(String password, Integer userId) {
        userCredentialsRepository.updatePasswordByUserId(password, userId);
    }
}
