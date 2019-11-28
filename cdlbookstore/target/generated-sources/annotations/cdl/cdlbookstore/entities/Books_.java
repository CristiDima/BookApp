package cdl.cdlbookstore.entities;

import cdl.cdlbookstore.entities.Authors;
import cdl.cdlbookstore.entities.Loanedbooks;
import cdl.cdlbookstore.entities.Types;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-09-02T23:39:26")
@StaticMetamodel(Book.class)
public class Books_ { 

    public static volatile SingularAttribute<Book, Types> idType;
    public static volatile CollectionAttribute<Book, Loanedbooks> loanedbooksCollection;
    public static volatile SingularAttribute<Book, Date> year;
    public static volatile SingularAttribute<Book, Double> price;
    public static volatile SingularAttribute<Book, String> name;
    public static volatile SingularAttribute<Book, Double> rating;
    public static volatile SingularAttribute<Book, String> description;
    public static volatile SingularAttribute<Book, String> guid;
    public static volatile SingularAttribute<Book, Authors> idAuthor;
    public static volatile SingularAttribute<Book, Integer> id;

}