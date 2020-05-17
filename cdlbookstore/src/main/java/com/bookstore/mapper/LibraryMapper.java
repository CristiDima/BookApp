package com.bookstore.mapper;

import com.bookstore.dto.LibraryDto;
import com.bookstore.entities.Library;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LibraryMapper {

    LibraryDto historyDtoToHistory(Library library);
    List<LibraryDto> historyDtoToHistory(List<Library> libraryList);
    Library historyToHistoryDto(LibraryDto bookDto);
    List<Library> historyToHistoryDto(List<LibraryDto> bookDtoList);

}
