package com.bookstore.controller;

import com.bookstore.dto.QuizDto;
import com.bookstore.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class QuizController {

    @Autowired
    QuizService quizService;

    @PostMapping("/quiz")
    private ResponseEntity<List<QuizDto>> saveQuiz(@RequestBody Map<String, List<QuizDto>> quizMap) {
        return quizService.saveQuiz(quizMap)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/quiz/{quizId}")
    private ResponseEntity<QuizDto> updateQuiz(@RequestBody QuizDto quizDto, @PathVariable int quizId) {
        return quizService.updateQuiz(quizDto, quizId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/quiz/{bookId}")
    private ResponseEntity<List<QuizDto>> getQuiz(@PathVariable int bookId) {
        return quizService.getQuiz(bookId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/quiz/{quizId}")
    private ResponseEntity<Boolean> deleteQuiz(@PathVariable int quizId) {
        return quizService.deleteQuiz(quizId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
