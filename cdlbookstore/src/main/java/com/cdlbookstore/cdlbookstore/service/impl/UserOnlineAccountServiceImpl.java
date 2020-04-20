package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.UserOnlineAccountDto;
import com.cdlbookstore.cdlbookstore.entities.UserOnlineAccount;
import com.cdlbookstore.cdlbookstore.mapper.UserOnlineAccountMapper;
import com.cdlbookstore.cdlbookstore.repositories.UserOnlineAccountRepository;
import com.cdlbookstore.cdlbookstore.service.UserOnlineAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class UserOnlineAccountServiceImpl implements UserOnlineAccountService {

    @Autowired
    UserOnlineAccountRepository userOnlineAccountRepository;

    @Autowired
    UserOnlineAccountMapper userOnlineAccountMapper;

    @Override
    public UserOnlineAccountDto getByUserId(int userId) {
        UserOnlineAccount userOnlineAccount = this.userOnlineAccountRepository.findByUserId(userId);
        if (userOnlineAccount != null && userOnlineAccount.getExpiresAt() != null && userOnlineAccount.getExpiresAt().after(new Date())) {
            userOnlineAccount.setValid(false);
            userOnlineAccountRepository.updateUserOnlineAccount(userOnlineAccount.isValid(), userId);
        }
        return userOnlineAccountMapper.userOnlineAccountToUserOnlineAccountDto(userOnlineAccount);
    }

    @Override
    public UserOnlineAccountDto setUserOnlineAccountDto(int userId) {
        UserOnlineAccount userOnlineAccount = this.userOnlineAccountRepository.findByUserId(userId);
        Calendar c = Calendar.getInstance();
        Date date = c.getTime();
        if (userOnlineAccount == null) {
            userOnlineAccount = new UserOnlineAccount();
            userOnlineAccount.setActivatedAt(date);
            userOnlineAccount.setUserId(userId);
            userOnlineAccount.setValid(true);
            c.add(Calendar.DATE, 30);
            date = c.getTime();
            userOnlineAccount.setExpiresAt(date);
            this.userOnlineAccountRepository.save(userOnlineAccount);
            return userOnlineAccountMapper.userOnlineAccountToUserOnlineAccountDto(userOnlineAccount);
        } else {
            userOnlineAccount.setActivatedAt(date);
            c.add(Calendar.DATE, 30);
            date = c.getTime();
            userOnlineAccount.setExpiresAt(date);
            userOnlineAccount.setValid(true);
            userOnlineAccountRepository.updateUserOnlineAccount(userOnlineAccount.getActivatedAt(), userOnlineAccount.getExpiresAt(),
                    userOnlineAccount.isValid(), userId);
            return userOnlineAccountMapper.userOnlineAccountToUserOnlineAccountDto(userOnlineAccount);
        }
    }
}
