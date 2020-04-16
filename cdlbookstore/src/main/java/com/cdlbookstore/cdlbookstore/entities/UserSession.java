package com.cdlbookstore.cdlbookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table( name = "user_session")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSession {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    @NotNull
    private String token;

    @Column
    @NotNull
    private Date created;

    @Column(name = "is_valid")
    @NotNull
    private boolean isValid;

    @Column(name = "user_id")
    @NotNull
    private int userId;
}
