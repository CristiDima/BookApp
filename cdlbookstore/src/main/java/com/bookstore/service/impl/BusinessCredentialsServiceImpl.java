package com.bookstore.service.impl;

import com.bookstore.dto.BusinessCredentialsDto;
import com.bookstore.entities.BusinessCredentials;
import com.bookstore.forms.LoginForm;
import com.bookstore.mapper.BusinessCredentialsMapper;
import com.bookstore.repositories.BusinessCredentialsRepository;
import com.bookstore.service.BusinessCredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessCredentialsServiceImpl implements BusinessCredentialsService {

    @Autowired
    private BusinessCredentialsRepository businessCredentialsRepository;

    @Autowired
    private BusinessCredentialsMapper businessCredentialsMapper;

    @Override
    public BusinessCredentialsDto getUserAccountByCredentials(LoginForm loginForm) {
        BusinessCredentials businessCredentials
                = businessCredentialsRepository.findByEmailAndPassword(loginForm.getUsername(), loginForm.getPassword());
        return businessCredentialsMapper.businessCredentialsToBusinessCredentialsDto(businessCredentials);
    }

    @Override
    public BusinessCredentialsDto findUserByEmail(String email) {
        BusinessCredentials businessCredentials = businessCredentialsRepository.findByEmail(email);
        return businessCredentialsMapper.businessCredentialsToBusinessCredentialsDto(businessCredentials);
    }

    @Override
    public BusinessCredentialsDto findUserByBusinessId(int businessId) {
        BusinessCredentials businessCredentials = businessCredentialsRepository.findByBusinessId(businessId);
        return businessCredentialsMapper.businessCredentialsToBusinessCredentialsDto(businessCredentials);
    }


    @Override
    public void saveBusinessAccountDetails(BusinessCredentialsDto businessCredentialsDto) {
        businessCredentialsRepository.save(businessCredentialsMapper.businessCredentialsDtoToBusinessCredentials(businessCredentialsDto));
    }

    @Override
    public void updateEmailByBusinessId(String email, Integer businessId) {
        businessCredentialsRepository.updateEmailByBusinessId(email, businessId);
    }

    @Override
    public void updatePasswordByBusinessId(String password, Integer businessId) {
        businessCredentialsRepository.updatePasswordByBusinessId(password, businessId);
    }
}
