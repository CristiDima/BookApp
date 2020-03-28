package com.cdlbookstore.cdlbookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table( name = "book_type" )
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Type {

    @Id
    @GeneratedValue ( strategy = GenerationType.AUTO )
    private int id;

    @Column
    private String name;

    @Column
    private String description;

}
