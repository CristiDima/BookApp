package com.cdlbookstore.cdlbookstore.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table( name = "user_bookstore")
@Data
public class UserBookster {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private int addressId;

    @Column
    private boolean isAdmin;

    public UserBookster() {
    }

    public UserBookster(String firstName, String lastName, int addressId, boolean isAdmin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.addressId = addressId;
        this.isAdmin = isAdmin;
    }

    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getAddressId() {
        return addressId;
    }

    public void setAddressId(int addressId) {
        this.addressId = addressId;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
