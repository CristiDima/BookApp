package com.cdlbookstore.cdlbookstore.entities;


import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    @NotNull
    private String street;

    @Column
    @NotNull
    private int number;

    @Column
    @NotNull
    private String city;

    @Column
    @NotNull
    private String district;

    public Address(){
    }

    public Address(String street, int number, String city, String district) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.district = district;
    }
}
