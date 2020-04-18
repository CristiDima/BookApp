package com.cdlbookstore.cdlbookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table (name = "user_credentials")
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableGenerator(name = "user_account_details_val", initialValue = 2)
public class UserCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "user_account_details_val")
    private int id;

    @Column
    @NotNull
    private String email;

    @Column
    @NotNull
    private String password;

    @Column(name = "user_id")
    @NotNull
    private int userId;

}
