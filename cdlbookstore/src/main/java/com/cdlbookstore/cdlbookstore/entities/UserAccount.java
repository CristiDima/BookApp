package com.cdlbookstore.cdlbookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table (name = "user_account")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAccount {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private int id;

    @Column
    private String email;

    @Column
    @NotNull
    private String password;

    @Column(name = "is_valid")
    private boolean isValid;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "user_id")
    private int userId;

}
