package cdl.cdlbookstore.repository;

import cdl.cdlbookstore.entities.LoanedBook;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanedBookRepository extends CrudRepository<LoanedBook, Long> {
    LoanedBook findByBookId ( long bookId );
    LoanedBook findByUserId ( long userId );
}
