package com.bookstore.mapper;

import com.bookstore.dto.UserCredentialsDto;
import com.bookstore.entities.UserCredentials;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserCredentialsMapper {

    UserCredentialsDto userCredentialsToUserCredentialsDto(UserCredentials userCredentials);
    List<UserCredentialsDto> userCredentialsToUserCredentialsDto(List<UserCredentials> userCredentialsList);
    UserCredentials UserCredentialsDtoToUserCredentials(UserCredentialsDto userAccount);
    List<UserCredentials> UserCredentialsDtoToUserCredentials(List<UserCredentialsDto> userAccountList);
}
