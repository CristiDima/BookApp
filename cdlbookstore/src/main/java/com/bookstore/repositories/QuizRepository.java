package com.bookstore.repositories;

import com.bookstore.entities.Quiz;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface QuizRepository extends CrudRepository<Quiz, Integer> {
    List<Quiz> findByBookId(int bookId);

    @Transactional
    void deleteById(int quizId);

    @Transactional
    @Modifying
    @Query("update Quiz q set q.question = ?1, q.firstChoice = ?2, q.secondChoice = ?3, " +
            "q.thirdChoice = ?4, q.fourthChoice = ?5 where q.id = ?6")
    void updateQuiz(String question, String firstChoice, String secondChoice, String thirdChoice, String fourthChoice, Integer userId);
}
