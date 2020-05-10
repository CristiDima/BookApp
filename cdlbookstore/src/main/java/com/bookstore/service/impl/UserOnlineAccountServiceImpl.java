package com.bookstore.service.impl;

import com.bookstore.dto.UserOnlineAccountDto;
import com.bookstore.entities.UserOnlineAccount;
import com.bookstore.mapper.UserOnlineAccountMapper;
import com.bookstore.repositories.UserOnlineAccountRepository;
import com.bookstore.service.UserOnlineAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
public class UserOnlineAccountServiceImpl implements UserOnlineAccountService {

    @Autowired
    UserOnlineAccountRepository userOnlineAccountRepository;

    @Autowired
    UserOnlineAccountMapper userOnlineAccountMapper;

    @Override
    public Optional<UserOnlineAccountDto> getByUserId(int userId) {
        UserOnlineAccount userOnlineAccount = this.userOnlineAccountRepository.findByUserId(userId);
        if (userOnlineAccount != null && userOnlineAccount.getExpiresAt() != null &&
                userOnlineAccount.getExpiresAt().before(new Date())) {
            userOnlineAccount.setValid(false);
            userOnlineAccountRepository.updateUserOnlineAccount(userOnlineAccount.isValid(), userId);
        }
        return Optional.ofNullable(userOnlineAccountMapper.userOnlineAccountToUserOnlineAccountDto(userOnlineAccount));
    }

    @Override
    public Optional<UserOnlineAccountDto> setUserOnlineAccountDto(int userId) {
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
            return Optional.ofNullable(userOnlineAccountMapper.userOnlineAccountToUserOnlineAccountDto(userOnlineAccount));
        } else {
            userOnlineAccount.setActivatedAt(date);
            c.add(Calendar.DATE, 30);
            date = c.getTime();
            userOnlineAccount.setExpiresAt(date);
            userOnlineAccount.setValid(true);
            userOnlineAccountRepository.updateUserOnlineAccount(userOnlineAccount.getActivatedAt(), userOnlineAccount.getExpiresAt(),
                    userOnlineAccount.isValid(), userId);
            return Optional.ofNullable(userOnlineAccountMapper.userOnlineAccountToUserOnlineAccountDto(userOnlineAccount));
        }
    }
}
