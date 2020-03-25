package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.ReadBookDto;
import com.cdlbookstore.cdlbookstore.entities.ReadBook;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReadBookMapper {

    ReadBookDto readBookToReadBookDto(ReadBook readBook);
    List<ReadBookDto> readBookToReadBookDto(List<ReadBook> readBookList);
    ReadBook readBookDtoToReadBook(ReadBookDto readBookDto);
    List<ReadBook> readBookDtoToReadBook(List<ReadBookDto> readBookDtoList);
}
