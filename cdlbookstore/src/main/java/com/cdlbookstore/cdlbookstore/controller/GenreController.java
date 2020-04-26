package com.cdlbookstore.cdlbookstore.controller;

import com.cdlbookstore.cdlbookstore.dto.GenreDto;
import com.cdlbookstore.cdlbookstore.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GenreController {

    @Autowired
    private GenreService genreService;

    @PostMapping("/genre")
    private ResponseEntity<GenreDto> getGenre(@RequestBody GenreDto genreDto) {
        return this.genreService.saveGenre(genreDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/genre")
    private ResponseEntity<List<GenreDto>> getGenre() {
        return genreService.getGenres()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/genre/{id}")
    private ResponseEntity<GenreDto> deleteGenre(@PathVariable("id") int id) {
       return this.genreService.deleteGenre(id)
               .map(ResponseEntity::ok)
               .orElse(ResponseEntity.notFound().build());
    }
}
