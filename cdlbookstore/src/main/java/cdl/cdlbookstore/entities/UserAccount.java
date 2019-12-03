package cdl.cdlbookstore.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "users")
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private boolean isValid;

    @Column
    private Date expirationDate;

    @Column
    private long userId;

    public  UserAccount() {
    }

    public UserAccount(String email, String password, boolean isValid, Date expirationDate, long userId) {
        this.email = email;
        this.password = password;
        this.isValid = isValid;
        this.expirationDate = expirationDate;
        this.userId = userId;
    }

    public long getId() {
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

    public long getUserId() {
        return userId;
    }

    public void setUserId(long idUser) {
        this.userId = idUser;
    }
}
