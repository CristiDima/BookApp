package com.cdlbookstore.cdlbookstore.mapper;

import com.cdlbookstore.cdlbookstore.dto.GenreDto;
import com.cdlbookstore.cdlbookstore.entities.Genre;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GenreMapper {

    GenreDto genreToGenreDto(Genre genre);
    List<GenreDto> genreToGenreDto(List<Genre> genreList);
    Genre genreDtoToGenre(GenreDto genreDto);
    List<Genre> genreDtoToGenre(List<GenreDto> genreDtoList);
}
