package com.entities;

import cdl.cdlbookstore.entities.Book;
import cdl.cdlbookstore.entities.Types;

import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-08-25T19:43:18")
@StaticMetamodel(Types.class)
public class Types_ { 

    public static volatile CollectionAttribute<Types, Book> booksCollection;
    public static volatile SingularAttribute<Types, String> name;
    public static volatile SingularAttribute<Types, String> guid;
    public static volatile SingularAttribute<Types, String> description;
    public static volatile SingularAttribute<Types, Integer> id;

}