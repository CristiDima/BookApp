package cdl.cdlbookstore.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "users")
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String email;
    private String password;
    private boolean isValid;
    private Date expirationDate;
    private long idUser;

    public UserAccount(String email, String password, boolean isValid, Date expirationDate, long idUser) {
        this.email = email;
        this.password = password;
        this.isValid = isValid;
        this.expirationDate = expirationDate;
        this.idUser = idUser;
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

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }
}
