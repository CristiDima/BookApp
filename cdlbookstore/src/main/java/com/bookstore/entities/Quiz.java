package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table( name = "quiz")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private int id;

    @Column
    @NotNull
    private String question;

    @Column(name = "first_choice")
    @NotNull
    private String firstChoice;

    @Column(name = "second_choice")
    @NotNull
    private String secondChoice;

    @Column(name = "third_choice")
    @NotNull
    private String thirdChoice;

    @Column(name = "fourth_choice")
    @NotNull
    private String fourthChoice;

    @Column(name = "book_id")
    @NotNull
    private int bookId;

}
