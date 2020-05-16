package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "user_vote")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserVote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    @NotNull
    private String user_id;

    @Column
    @NotNull
    private String book_id;

    @Column
    @NotNull
    private String rating;
}
