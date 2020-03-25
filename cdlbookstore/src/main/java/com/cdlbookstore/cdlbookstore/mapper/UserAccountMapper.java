package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserAccountDto;
import com.cdlbookstore.cdlbookstore.entities.UserAccount;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserAccountMapper {

    UserAccountDto userAccountToUserAccountDto(UserAccount userAccount);
    List<UserAccountDto> userAccountToUserAccountDto(List<UserAccount> userAccountList);
    UserAccount userAccountDtoToUserAccount(UserAccountDto userAccount);
    List<UserAccount> userAccountDtoToUserAccount(List<UserAccountDto> userAccountList);
}
