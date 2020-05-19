package com.bookstore.mapper;

import com.bookstore.dto.BusinessAccountDto;
import com.bookstore.entities.BusinessAccount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BusinessAccountMapper {

    BusinessAccountDto businessAccountToBusinessAccountDto(BusinessAccount businessAccount);
    List<BusinessAccountDto> businessAccountToBusinessAccountDto(List<BusinessAccount> businessAccountList);
    BusinessAccount businessAccountDtoToBusinessAccount (BusinessAccountDto businessAccountDto);
    List<BusinessAccount> businessAccountDtoToBusinessAccount(List<BusinessAccountDto> businessAccountDtoList);
}
