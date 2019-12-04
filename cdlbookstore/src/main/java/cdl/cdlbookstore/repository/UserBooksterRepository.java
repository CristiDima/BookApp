package cdl.cdlbookstore.repository;

import cdl.cdlbookstore.entities.UserBookster;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBooksterRepository extends CrudRepository<UserBookster, Integer> {
    UserBookster findByFirstName(String firstName );
    UserBookster findById(int id );
    UserBookster findUsersById (int id );
    UserBookster findByAddressId(int id );
    UserBookster deleteAllById(int id );
}