package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserOnlineAccountDto;
import com.cdlbookstore.cdlbookstore.entities.UserOnlineAccount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserOnlineAccountMapper {

    UserOnlineAccountDto userOnlineAccountToUserOnlineAccountDto(UserOnlineAccount userOnlineAccountDetails);
    List<UserOnlineAccountDto> userOnlineAccountToUserOnlineAccountDto(List<UserOnlineAccount> userOnlineAccountDetailsList);
    UserOnlineAccount userOnlineAccountDtoToUserOnlineAccount(UserOnlineAccountDto userAccount);
    List<UserOnlineAccount> userOnlineAccountDtoToUserOnlineAccount(List<UserOnlineAccountDto> userAccountList);
}
