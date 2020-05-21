package com.bookstore.service.impl;

import com.bookstore.dto.BusinessAccountDto;
import com.bookstore.dto.UserBookstoreDto;
import com.bookstore.entities.BusinessAccount;
import com.bookstore.entities.UserBookstore;
import com.bookstore.mapper.BusinessAccountMapper;
import com.bookstore.repositories.BusinessAccountRepository;
import com.bookstore.service.BusinessAccountService;
import com.bookstore.service.UserBookstoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

@Service
public class BusinessAccountServiceImpl implements BusinessAccountService {

    @Autowired
    private UserBookstoreService userBookstoreService;

    @Autowired
    private BusinessAccountRepository businessAccountRepository;

    @Autowired
    private BusinessAccountMapper businessAccountMapper;

    private int validity = 30;

    @Override
    public Optional<BusinessAccountDto> getByUserId(int userId) {
        UserBookstoreDto userBookstoreDto = userBookstoreService.getUserById(userId).orElse(null);
        BusinessAccount userBusinessAccount = null;
        if (userBookstoreDto != null && userBookstoreDto.isFromBusiness()) {
            UserBookstoreDto userCompanyBookstoreDto = userBookstoreService.getByCompanyName(userBookstoreDto.getCompanyName());
            if (userCompanyBookstoreDto != null) {
                userBusinessAccount = this.businessAccountRepository.findByUserId(userCompanyBookstoreDto.getId());
            }

        } else {
            userBusinessAccount = this.businessAccountRepository.findByUserId(userId);
        }

        if (userBusinessAccount != null && userBusinessAccount.getExpiresAt() != null &&
                userBusinessAccount.getExpiresAt().before(new Date())) {
            userBusinessAccount.setValid(false);
            businessAccountRepository.updateBusinessAccount(userBusinessAccount.isValid(), userId);
        }
        return Optional.ofNullable(businessAccountMapper.businessAccountToBusinessAccountDto(userBusinessAccount));
    }

    @Override
    public Optional<BusinessAccountDto> setUserBusinessAccountDto(int userId) {
        BusinessAccount businessAccount = this.businessAccountRepository.findByUserId(userId);

        Calendar c = Calendar.getInstance();
        Date date = c.getTime();
        if (businessAccount == null) {
            businessAccount = new BusinessAccount();
            businessAccount.setActivatedAt(date);
            businessAccount.setUserId(userId);
            businessAccount.setValid(true);
            c.add(Calendar.DATE, validity);
            date = c.getTime();
            businessAccount.setExpiresAt(date);
            this.businessAccountRepository.save(businessAccount);
            return Optional.ofNullable(businessAccountMapper.businessAccountToBusinessAccountDto(businessAccount));
        } else {
            businessAccount.setActivatedAt(date);
            c.add(Calendar.DATE, validity);
            date = c.getTime();
            businessAccount.setExpiresAt(date);
            businessAccount.setValid(true);
            businessAccountRepository.updateBusinessAccount(businessAccount.getActivatedAt(), businessAccount.getExpiresAt(),
                    businessAccount.isValid(), userId);
            return Optional.ofNullable(businessAccountMapper.businessAccountToBusinessAccountDto(businessAccount));
        }
    }

    @Override
    public Optional<BusinessAccountDto> updateBusinessAccountDto(int userId) {
        BusinessAccount businessAccount = this.businessAccountRepository.findByUserId(userId);
        if (businessAccount == null) {
            return Optional.ofNullable(null);
        } else {
            LocalDateTime localDateTime = businessAccount.getExpiresAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            LocalDateTime tempLocalDateTime = localDateTime.plusDays(validity);
            businessAccount.setExpiresAt(java.sql.Timestamp.valueOf(tempLocalDateTime));
            businessAccount.setValid(true);
            businessAccountRepository.updateBusinessAccount(businessAccount.getActivatedAt(), businessAccount.getExpiresAt(),
                    businessAccount.isValid(), userId);
            return Optional.ofNullable(businessAccountMapper.businessAccountToBusinessAccountDto(businessAccount));
        }
    }
}
