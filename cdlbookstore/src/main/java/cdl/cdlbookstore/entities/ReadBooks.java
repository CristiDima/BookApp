package cdl.cdlbookstore.entities;

import javax.persistence.*;

@Entity
@Table(name = "readbooks")
public class ReadBooks {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long userId;
    private long bookId;
    private int readPages;
}
