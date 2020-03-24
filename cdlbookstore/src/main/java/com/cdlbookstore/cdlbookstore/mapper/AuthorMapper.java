package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.AuthorDto;
import com.cdlbookstore.cdlbookstore.entities.Author;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AuthorMapper {

    AuthorDto authorToAuthorDto(Author author);

    List<AuthorDto> authorToAuthorDto(List<Author> authorList);
}
