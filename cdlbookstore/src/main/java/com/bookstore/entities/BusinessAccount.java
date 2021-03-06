package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table( name = "business_account")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessAccount {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private int id;

    @Column
    @NotNull
    private boolean isValid;

    @Column (name = "activated_at")
    @NotNull
    private Date activatedAt;

    @Column(name = "expires_at")
    private Date expiresAt;

    @Column(name = "user_id")
    @NotNull
    private int userId;
}
