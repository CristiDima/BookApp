package com.cdlbookstore.cdlbookstore.repositories;

import com.cdlbookstore.cdlbookstore.entities.UserResetPassword;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserResetPasswordRepository extends CrudRepository<UserResetPassword, Integer> {
    UserResetPassword findByUserIdAndToken(int userId, String token);
}
