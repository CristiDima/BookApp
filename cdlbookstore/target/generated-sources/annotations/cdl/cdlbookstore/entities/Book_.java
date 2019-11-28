package cdl.cdlbookstore.entities;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-11-25T22:07:10")
@StaticMetamodel(Book.class)
public class Book_ { 

    public static volatile SingularAttribute<Book, String> name;
    public static volatile SingularAttribute<Book, Double> rating;
    public static volatile SingularAttribute<Book, String> description;
    public static volatile SingularAttribute<Book, Long> typeId;
    public static volatile SingularAttribute<Book, Long> id;
    public static volatile SingularAttribute<Book, Long> authorId;

}