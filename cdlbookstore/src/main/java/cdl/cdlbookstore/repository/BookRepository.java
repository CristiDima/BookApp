package cdl.cdlbookstore.repository;

import cdl.cdlbookstore.entities.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
    Book findByName( String name );
    Book findByAuthorId( long authorId );
    Book findByTypeId( long typeId );
    Book findAllByNameAndAuthorIdAndTypeId ( String name, long authorId, long typeId);
}
