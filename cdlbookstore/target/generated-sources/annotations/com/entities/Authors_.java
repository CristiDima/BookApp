package com.entities;

import cdl.cdlbookstore.entities.Authors;
import cdl.cdlbookstore.entities.Book;

import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2019-08-25T19:43:18")
@StaticMetamodel(Authors.class)
public class Authors_ { 

    public static volatile CollectionAttribute<Authors, Book> booksCollection;
    public static volatile SingularAttribute<Authors, String> name;
    public static volatile SingularAttribute<Authors, String> description;
    public static volatile SingularAttribute<Authors, String> guid;
    public static volatile SingularAttribute<Authors, Integer> id;

}