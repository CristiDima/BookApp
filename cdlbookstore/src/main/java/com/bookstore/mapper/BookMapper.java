package com.bookstore.mapper;

import com.bookstore.dto.BookDto;
import com.bookstore.entities.Book;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {AuthorMapper.class, GenreMapper.class})
public interface BookMapper {


    BookDto bookToBookDto(Book book);
    List<BookDto> bookDoBookDto(List<Book> bookList);
    Book bookDtoToBook(BookDto bookDto);
    List<Book> bookDtoToBook(List<BookDto> bookDtoList);
}
