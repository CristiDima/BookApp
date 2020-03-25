package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.BookTypeDto;
import com.cdlbookstore.cdlbookstore.entities.BookType;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookTypeMapper {

    BookTypeDto bookTypeToBookTypeDto(BookType bookType);
    List<BookTypeDto> bookTypeToBookTypeDto(List<BookType> bookTypeList);
    BookType bookTypeDtoToBookType(BookTypeDto bookTypeDto);
    List<BookType> bookTypeDtoToBookType(List<BookTypeDto> bookTypeDtoList);
}
