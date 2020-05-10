package com.bookstore.mapper;

import com.bookstore.dto.AuthorDto;
import com.bookstore.entities.Author;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AuthorMapper {

    AuthorDto authorToAuthorDto(Author author);
    List<AuthorDto> authorToAuthorDto(List<Author> authorList);
    Author authorDtoToAuthor(AuthorDto authorDto);
    List<Author> authorDtoToAuthor(List<AuthorDto> authorDtoList);
}
