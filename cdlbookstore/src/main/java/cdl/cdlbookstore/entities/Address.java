package cdl.cdlbookstore.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "address")
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

    public long getId() {
        return id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }
}
