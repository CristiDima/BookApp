package com.cdlbookstore.cdlbookstore.service.impl;

import com.cdlbookstore.cdlbookstore.dto.GenreDto;
import com.cdlbookstore.cdlbookstore.entities.Genre;
import com.cdlbookstore.cdlbookstore.mapper.GenreMapper;
import com.cdlbookstore.cdlbookstore.repositories.GenreRepository;
import com.cdlbookstore.cdlbookstore.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GenreServiceImpl implements GenreService {

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private GenreMapper genreMapper;

    @Override
    public GenreDto getGenreById(int id) {
        Genre genre = genreRepository.findById(id).get();
        return genreMapper.genreToGenreDto(genre);
    };

    @Override
    public Optional<List<GenreDto>> getGenres() {
        List<Genre> genres = new ArrayList<>();
        genreRepository.findAll().forEach(genres::add);

        return Optional.ofNullable(genreMapper.genreToGenreDto(genres));
    }

    @Override
    public Optional<GenreDto> saveGenre(GenreDto genreDto) {
        genreRepository.save(genreMapper.genreDtoToGenre(genreDto));
        return Optional.ofNullable(genreDto);
    }

    @Override
    public Optional<GenreDto> deleteGenre(int id) {
        GenreDto genreDto = getGenreById(id);
        genreRepository.delete(genreMapper.genreDtoToGenre(genreDto));

        return Optional.ofNullable(genreDto);
    }
}
