package com.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizDto {

    private int id;

    private String question;

    private String firstChoice;

    private String secondChoice;

    private String thirdChoice;

    private String fourthChoice;

    private int bookId;
}
