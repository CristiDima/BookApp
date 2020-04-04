package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.OnlineBookDto;
import com.cdlbookstore.cdlbookstore.entities.OnlineBook;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface OnlineBookMapper {

    OnlineBookDto onlineBookToOnlineBookDto(OnlineBook onlineBook);
    List<OnlineBookDto> onlineBookToOnlineBookDto(List<OnlineBook> onlineBookList);
    OnlineBook onlineBookDtoToOnlineBook(OnlineBookDto onlineBookDto);
    List<OnlineBook> onlineBookDtoToOnlineBook(List<OnlineBookDto> onlineBookDtoList);
}
