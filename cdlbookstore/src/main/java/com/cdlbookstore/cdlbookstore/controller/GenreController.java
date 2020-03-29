package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.GenreDto;
import com.cdlbookstore.cdlbookstore.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GenreController {

    @Autowired
    private GenreService genreService;

    @PostMapping("/genre")
    private GenreDto getGenre(@RequestBody GenreDto genreDto) {
        this.genreService.saveGenre(genreDto);
        return genreDto;
    }

    @GetMapping("/genre")
    private List<GenreDto> getGenre() {
        return genreService.getGenres();
    }

    @DeleteMapping("/genre/{id}")
    private GenreDto deleteGenre(@PathVariable("id") int id){
       GenreDto genreDto = this.genreService.getGenreById(id);
       this.genreService.deleteGenre(genreDto);

       return genreDto;
    }
}
