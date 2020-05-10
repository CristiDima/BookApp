package com.bookstore.service.impl;

import com.bookstore.service.UserPhysicalAccountService;
import com.bookstore.dto.UserPhysicalAccountDto;
import com.bookstore.entities.UserPhysicalAccount;
import com.bookstore.mapper.UserPhysicalAccountMapper;
import com.bookstore.repositories.UserPhysicalAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
public class UserPhysicalAccountServiceImpl implements UserPhysicalAccountService {

    @Autowired
    UserPhysicalAccountRepository userPhysicalAccountRepository;

    @Autowired
    UserPhysicalAccountMapper userPhysicalAccountMapper;

    @Override
    public  Optional<UserPhysicalAccountDto> getByUserId(int userId) {
        UserPhysicalAccount userPhysicalAccount = this.userPhysicalAccountRepository.findByUserId(userId);
        if (userPhysicalAccount != null && userPhysicalAccount.getExpiresAt() != null &&
                userPhysicalAccount.getExpiresAt().before(new Date())) {
            userPhysicalAccount.setValid(false);
            userPhysicalAccountRepository.updateUserPhysicalAccount(userPhysicalAccount.isValid(), userId);
        }
        return Optional.ofNullable(userPhysicalAccountMapper.userPhysicalAccountToUserPhysicalAccountDto(userPhysicalAccount));
    }

    @Override
    public Optional<UserPhysicalAccountDto> setUserOnlineAccountDto(int userId) {
        UserPhysicalAccount userPhysicalAccount = this.userPhysicalAccountRepository.findByUserId(userId);
        Calendar c = Calendar.getInstance();
        Date date = c.getTime();
        if (userPhysicalAccount == null) {
            userPhysicalAccount = new UserPhysicalAccount();
            userPhysicalAccount.setActivatedAt(date);
            userPhysicalAccount.setUserId(userId);
            userPhysicalAccount.setValid(true);
            c.add(Calendar.DATE, 30);
            date = c.getTime();
            userPhysicalAccount.setExpiresAt(date);
            this.userPhysicalAccountRepository.save(userPhysicalAccount);
            return Optional.ofNullable(userPhysicalAccountMapper.userPhysicalAccountToUserPhysicalAccountDto(userPhysicalAccount));
        } else {
            userPhysicalAccount.setActivatedAt(date);
            c.add(Calendar.DATE, 30);
            date = c.getTime();
            userPhysicalAccount.setExpiresAt(date);
            userPhysicalAccount.setValid(true);
            userPhysicalAccountRepository.updateUserPhysicalAccount(userPhysicalAccount.getActivatedAt(), userPhysicalAccount.getExpiresAt(),
                    userPhysicalAccount.isValid(), userId);
            return Optional.ofNullable(userPhysicalAccountMapper.userPhysicalAccountToUserPhysicalAccountDto(userPhysicalAccount));
        }
    }
}
