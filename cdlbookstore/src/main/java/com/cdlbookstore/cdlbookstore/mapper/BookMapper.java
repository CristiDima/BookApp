package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.BookDto;
import com.cdlbookstore.cdlbookstore.entities.Book;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {AuthorMapper.class, GenreMapper.class})
public interface BookMapper {


    BookDto bookToBookDto(Book book);
    List<BookDto> bookDoBookDto(List<Book> bookList);
    Book bookDtoToBook(BookDto bookDto);
    List<Book> bookDtoToBook(List<BookDto> bookDtoList);
}
