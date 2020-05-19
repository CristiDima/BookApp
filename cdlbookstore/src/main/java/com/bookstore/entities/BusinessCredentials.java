package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "business_credentials")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "user_account_details_val")
    private int id;

    @Column
    @NotNull
    private String email;

    @Column
    @NotNull
    private String password;

    @Column(name = "business_id")
    @NotNull
    private int businessId;

}
