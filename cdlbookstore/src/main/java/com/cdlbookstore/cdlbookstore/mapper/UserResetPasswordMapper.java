package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserResetPasswordDto;
import com.cdlbookstore.cdlbookstore.entities.UserResetPassword;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserResetPasswordMapper {
    UserResetPasswordDto userResetPasswordToUserResetPasswordDto(UserResetPassword userResetPassword);
    List<UserResetPasswordDto> userResetPasswordToUserResetPasswordDto(List<UserResetPassword> userResetPasswordList);
    UserResetPassword userResetPasswordDtoToResetPassword(UserResetPasswordDto userResetPasswordDto);
    List<UserResetPassword> userResetPasswordDtoToResetPassword(List<UserResetPasswordDto> userResetPasswordDtoList);
}
