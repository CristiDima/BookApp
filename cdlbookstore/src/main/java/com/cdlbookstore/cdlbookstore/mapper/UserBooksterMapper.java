package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.UserBooksterDto;
import com.cdlbookstore.cdlbookstore.entities.UserBookster;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserBooksterMapper {

    UserBooksterDto userBooksterToUserBooksterDto(UserBookster userBookster);
    List<UserBooksterDto> userBooksterToUserBooksterDto(List<UserBookster> userBooksterList);
    UserBookster userBooksterDtoToUserBookster(UserBooksterDto userBooksterDto);
    List<UserBookster> userBooksterDtoToUserBookster(List<UserBooksterDto> userBooksterDtoList);
}
