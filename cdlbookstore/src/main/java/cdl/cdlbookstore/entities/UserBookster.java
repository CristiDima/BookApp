package cdl.cdlbookstore.entities;


import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "usersbookster")
@Data
public class UserBookster {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column
    @NotNull
    private String firstName;

    @Column
    @NotNull
    private String lastName;

    @Column
    private int addressId;

    @Column
    private boolean isAdmin;

    public UserBookster(){
    }

    public UserBookster(String firstName, String lastName, boolean isAdmin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.isAdmin = isAdmin;
    }

    public UserBookster(String firstName, String lastName, int addressId, boolean isAdmin) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.addressId = addressId;
        this.isAdmin = isAdmin;
    }
}
