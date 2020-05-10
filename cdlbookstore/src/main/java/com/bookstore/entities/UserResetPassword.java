package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "user_reset_password")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResetPassword {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private int id;

    @Column
    private String token;

    @Column(name ="expires_At")
    private Date expiresAt;

    @Column(name = "user_id")
    @NotNull
    private int userId;
}
