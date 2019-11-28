package cdl.cdlbookstore.repository;

import cdl.cdlbookstore.entities.UserAccount;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends CrudRepository<UserAccount, Long> {
        UserAccount findByIdUser( long idUser );
        UserAccount findByIdUserAndIsValid( long idUser, boolean isValid );
}
