package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserAccountDetailsDto;
import com.cdlbookstore.cdlbookstore.dto.UserAccountValabilityDto;
import com.cdlbookstore.cdlbookstore.entities.UserAccountDetails;
import com.cdlbookstore.cdlbookstore.entities.UserAccountValability;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserAccountValabilityMapper {

    UserAccountValabilityDto userAccountValabilityToUserAccountValabilityDto(UserAccountValability userAccountDetails);
    List<UserAccountValabilityDto> userAccountValabilityToUserAccountValabilityDto(List<UserAccountValability> userAccountDetailsList);
    UserAccountValability userAccountValabilityDtoToUserAccountValability(UserAccountValabilityDto userAccount);
    List<UserAccountValability> userAccountValabilityDtoToUserAccountValability(List<UserAccountValabilityDto> userAccountList);
}
