package com.bookstore.mapper;

import com.bookstore.dto.UserPhysicalAccountDto;
import com.bookstore.entities.UserPhysicalAccount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserPhysicalAccountMapper {

    UserPhysicalAccountDto userPhysicalAccountToUserPhysicalAccountDto(UserPhysicalAccount userOnlineAccountDetails);
    List<UserPhysicalAccountDto> userPhysicalAccountToUserPhysicalAccountDto(List<UserPhysicalAccount> userOnlineAccountDetailsList);
    UserPhysicalAccount userPhysicalAccountDtoToUserPhysicalAccount(UserPhysicalAccountDto userAccount);
    List<UserPhysicalAccount> userPhysicalAccountDtoToUserPhysicalAccount(List<UserPhysicalAccountDto> userAccountList);
}
