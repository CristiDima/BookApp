package com.bookstore.service.impl;

import com.bookstore.dto.QuizDto;
import com.bookstore.entities.Quiz;
import com.bookstore.mapper.QuizMapper;
import com.bookstore.repositories.QuizRepository;
import com.bookstore.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizMapper quizMapper;

    @Override
    public Optional<List<QuizDto>> saveQuiz(Map<String, List<QuizDto>> quizMap) {
        List<QuizDto> quizDtoList = quizMap.get("quiz");
        if (quizDtoList == null) {
            return Optional.ofNullable(quizDtoList);
        }

        for (QuizDto quizDto : quizDtoList) {
            quizRepository.save(quizMapper.quizDtoToQuiz(quizDto));
        }
        int bookId = quizDtoList.get(0).getBookId();
        List<Quiz> quizList = quizRepository.findByBookId(bookId);
        return Optional.ofNullable(quizMapper.quizToQuizDto(quizList));
    }

    @Override
    public Optional<List<QuizDto>> getQuiz(int bookId) {
        List<Quiz> quizList = quizRepository.findByBookId(bookId);
        return Optional.ofNullable(quizMapper.quizToQuizDto(quizList));
    }

    @Override
    public Optional<QuizDto> updateQuiz(QuizDto quizDto, int quizId) {
        quizRepository.updateQuiz(quizDto.getQuestion(), quizDto.getFirstChoice(), quizDto.getSecondChoice(),
                quizDto.getThirdChoice(), quizDto.getFourthChoice(), quizId);
        QuizDto tempQuizDto = quizMapper.quizToQuizDto(quizRepository.findById(quizId).orElse(null));
        return Optional.ofNullable(tempQuizDto);
    }

    @Override
    public Optional<Boolean> deleteQuiz(int quizId) {
        quizRepository.deleteById(quizId);
        return Optional.ofNullable(true);
    }
}
