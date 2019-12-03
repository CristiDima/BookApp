package cdl.cdlbookstore.repository;

import cdl.cdlbookstore.entities.Address;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends CrudRepository<Address, Integer> {
    Address findById(int id );
    Address findAddressById ( int id );
    Address findAllBy ();
}
