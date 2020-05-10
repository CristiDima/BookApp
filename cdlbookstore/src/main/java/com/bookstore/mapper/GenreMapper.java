package com.bookstore.mapper;

import com.bookstore.dto.GenreDto;
import com.bookstore.entities.Genre;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GenreMapper {

    GenreDto genreToGenreDto(Genre genre);
    List<GenreDto> genreToGenreDto(List<Genre> genreList);
    Genre genreDtoToGenre(GenreDto genreDto);
    List<Genre> genreDtoToGenre(List<GenreDto> genreDtoList);
}
