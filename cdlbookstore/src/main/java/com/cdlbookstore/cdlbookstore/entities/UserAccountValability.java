package com.cdlbookstore.cdlbookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table( name = "user_account_valability")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAccountValability {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private int id;

    @Column
    @NotNull
    private boolean isValid;

    @Column
    @NotNull
    private Date expirationDate;

    @Column(name = "account_id")
    @NotNull
    private int accountId;
}
