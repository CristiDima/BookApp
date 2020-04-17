package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserCredentialsDto;
import com.cdlbookstore.cdlbookstore.entities.UserCredentials;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserCredentialsMapper {

    UserCredentialsDto userCredentialsToUserCredentialsDto(UserCredentials userCredentials);
    List<UserCredentialsDto> userCredentialsToUserCredentialsDto(List<UserCredentials> userCredentialsList);
    UserCredentials UserCredentialsDtoToUserCredentials(UserCredentialsDto userAccount);
    List<UserCredentials> UserCredentialsDtoToUserCredentials(List<UserCredentialsDto> userAccountList);
}
