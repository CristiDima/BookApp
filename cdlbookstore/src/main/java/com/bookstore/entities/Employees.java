package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employees {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    @NotNull
    private String email;

    @Column (name = "business_id")
    @NotNull
    private int businessId;

    @Column
    private String name;

    @Column
    @NotNull
    private String token;

    @Column (name = "expires_at")
    @NotNull
    private Date expiresAt;
}
