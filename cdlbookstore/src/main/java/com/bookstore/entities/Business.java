package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table( name = "business")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "user_bookstore_val")
    private int id;

    @Column(name = "company_name")
    @NotNull
    private String companyName;

    @Column(name = "address_id")
    @NotNull
    private int addressId;

    @Column(name = "phone_number")
    @NotNull
    private  String phoneNumber;
}
