package com.bookstore.mapper;

import com.bookstore.dto.UserSessionDto;
import com.bookstore.entities.UserSession;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserSessionMapper {

    UserSessionDto userSessionToUserSessionDto(UserSession userSession);
    List<UserSessionDto> userSessionToUserSessionDto(List<UserSession> userSessionList);
    UserSession userSessionDtoToUserSession(UserSessionDto userSessionDto);
    List<UserSession> userSessionDtoToUserSession(List<UserSessionDto> userSessionDtoList );
}
