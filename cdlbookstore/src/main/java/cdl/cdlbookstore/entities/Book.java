package cdl.cdlbookstore.entities;

import javax.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private long authorId;

    @Column
    private long typeId;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private double rating;

    public Book() {
    }

    public Book(long authorId, long typeId, String name, String description) {
        this.authorId = authorId;
        this.typeId = typeId;
        this.name = name;
        this.description = description;
    }

    public Book(long authorId, long typeId, String name, String description, double rating) {
        this.authorId = authorId;
        this.typeId = typeId;
        this.name = name;
        this.description = description;
        this.rating = rating;
    }

    public long getId() {
        return id;
    }

    public long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(long authorId) {
        this.authorId = authorId;
    }

    public long getTypeId() {
        return typeId;
    }

    public void setTypeId(long typeId) {
        this.typeId = typeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
