package com.bookstore.service;

import com.bookstore.dto.QuizDto;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface QuizService {
    Optional<List<QuizDto>> saveQuiz(Map<String, List<QuizDto>> quizMap);
    Optional<List<QuizDto>> getQuiz(int bookId);
    Optional<QuizDto> updateQuiz(QuizDto quizDto, int quizId);
    Optional<Boolean> deleteQuiz(int quizId);

}
