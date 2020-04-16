package com.cdlbookstore.cdlbookstore.entities;


import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableGenerator(name = "address_val", initialValue = 2)
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "address_val")
    private int id;

    @Column
    @NotNull
    private String address;

    @Column
    @NotNull
    private String city;

    @Column
    @NotNull
    private String district;

}
