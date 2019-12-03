package cdl.cdlbookstore.repository;

import cdl.cdlbookstore.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByFirstName( String firstName );
    User findById( int id );
    User findUsersById ( int id );
    User findByAddressId( int id );
    User deleteAllById( int id );
}