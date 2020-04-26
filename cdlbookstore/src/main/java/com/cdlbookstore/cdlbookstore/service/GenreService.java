package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.GenreDto;

import java.util.List;
import java.util.Optional;

public interface GenreService {

    GenreDto getGenreById(int id);
    Optional<List<GenreDto>> getGenres();

    Optional<GenreDto> saveGenre(GenreDto genreDto);
    Optional<GenreDto> deleteGenre(int id);
}
