package cdl.cdlbookstore.entities;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "loanedbooks")
public class LoanedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long userId;
    private long bookId;
    private Date dateToReturn;

    public LoanedBook(long userId, long bookId, Date dateToReturn) {
        this.userId = userId;
        this.bookId = bookId;
        this.dateToReturn = dateToReturn;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getBookId() {
        return bookId;
    }

    public void setBookId(long bookId) {
        this.bookId = bookId;
    }

    public Date getDateToReturn() {
        return dateToReturn;
    }

    public void setDateToReturn(Date dateToReturn) {
        this.dateToReturn = dateToReturn;
    }
}
