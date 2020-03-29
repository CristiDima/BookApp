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
    public List<GenreDto> getGenres() {
        List<Genre> genres = new ArrayList<>();
        genreRepository.findAll().forEach(genres::add);

        return genreMapper.genreToGenreDto(genres);
    }

    @Override
    public void saveGenre(GenreDto genreDto) {

        genreRepository.save(genreMapper.genreDtoToGenre(genreDto));
    }

    @Override
    public void deleteGenre(GenreDto genreDto) {

        genreRepository.delete(genreMapper.genreDtoToGenre(genreDto));
    }
}
