package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserAccountDetailsDto;
import com.cdlbookstore.cdlbookstore.entities.UserAccountDetails;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserAccountDetailsMapper {

    UserAccountDetailsDto userAccountDetailsToUserAccountDetailsDto(UserAccountDetails userAccountDetails);
    List<UserAccountDetailsDto> userAccountDetailsToUserAccountDetailsDto(List<UserAccountDetails> userAccountDetailsList);
    UserAccountDetails userAccountDetailsDtoToUserAccountDetails(UserAccountDetailsDto userAccount);
    List<UserAccountDetails> userAccountDetailsDtoToUserAccountDetails(List<UserAccountDetailsDto> userAccountList);
}
