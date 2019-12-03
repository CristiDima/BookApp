package cdl.cdlbookstore.entities;

import javax.persistence.*;

@Entity
@Table(name = "readbooks")
public class ReadBooks {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private long userId;

    @Column
    private long bookId;

    @Column
    private int readPages;

    public ReadBooks() {
    }

    public ReadBooks(long userId, long bookId, int readPages) {
        this.userId = userId;
        this.bookId = bookId;
        this.readPages = readPages;
    }

    public long getUserId() {
        return userId;
    }

    public long getBookId() {
        return bookId;
    }

    public int getReadPages() {
        return readPages;
    }
}
