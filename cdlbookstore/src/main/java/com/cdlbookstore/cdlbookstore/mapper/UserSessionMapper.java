package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserSessionDto;
import com.cdlbookstore.cdlbookstore.entities.UserSession;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserSessionMapper {

    UserSessionDto userSessionToUserSessionDto(UserSession userSession);
    List<UserSessionDto> userSessionToUserSessionDto(List<UserSession> userSessionList);
    UserSession userSessionDtoToUserSession(UserSessionDto userSessionDto);
    List<UserSession> userSessionDtoToUserSession(List<UserSessionDto> userSessionDtoList );
}
