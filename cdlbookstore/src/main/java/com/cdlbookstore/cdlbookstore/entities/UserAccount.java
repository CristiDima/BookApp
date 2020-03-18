package com.cdlbookstore.cdlbookstore.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table (name = "user_account")
@Data
public class UserAccount {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    private int id;

    @Column
    private String email;

    @Column
    @NotNull
    private String password;

    @Column(name = "is_valid")
    private boolean isValid;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "user_id")
    private int userId;

    public UserAccount() {
    }

    public UserAccount(String email, @NotNull String password, boolean isValid, Date expirationDate, @NotNull int userId) {
        this.email = email;
        this.password = password;
        this.isValid = isValid;
        this.expirationDate = expirationDate;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
