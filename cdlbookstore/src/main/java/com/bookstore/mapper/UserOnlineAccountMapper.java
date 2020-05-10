package com.bookstore.mapper;

import com.bookstore.dto.UserOnlineAccountDto;
import com.bookstore.entities.UserOnlineAccount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserOnlineAccountMapper {

    UserOnlineAccountDto userOnlineAccountToUserOnlineAccountDto(UserOnlineAccount userOnlineAccountDetails);
    List<UserOnlineAccountDto> userOnlineAccountToUserOnlineAccountDto(List<UserOnlineAccount> userOnlineAccountDetailsList);
    UserOnlineAccount userOnlineAccountDtoToUserOnlineAccount(UserOnlineAccountDto userAccount);
    List<UserOnlineAccount> userOnlineAccountDtoToUserOnlineAccount(List<UserOnlineAccountDto> userAccountList);
}
