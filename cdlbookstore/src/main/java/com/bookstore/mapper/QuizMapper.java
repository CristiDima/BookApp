package com.bookstore.mapper;

import com.bookstore.dto.QuizDto;
import com.bookstore.entities.Quiz;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuizMapper {

    QuizDto quizToQuizDto(Quiz quiz);
    List<QuizDto> quizToQuizDto(List<Quiz> quizList);
    Quiz quizDtoToQuiz(QuizDto quizDto);
    List<Quiz> quizDtoToQuiz(List<QuizDto> quizDtoList);
}
