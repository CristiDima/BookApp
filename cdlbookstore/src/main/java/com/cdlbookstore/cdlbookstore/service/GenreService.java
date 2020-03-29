package com.cdlbookstore.cdlbookstore.service;

import com.cdlbookstore.cdlbookstore.dto.GenreDto;

import java.util.List;

public interface GenreService {

    GenreDto getGenreById(int id);
    List<GenreDto> getGenres();

    void saveGenre(GenreDto genreDto);
    void deleteGenre(GenreDto genreDto);
}
