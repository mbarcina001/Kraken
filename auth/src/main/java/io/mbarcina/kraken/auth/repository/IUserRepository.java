package io.mbarcina.kraken.auth.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.auth.entity.User;

@Repository
public interface IUserRepository extends CrudRepository<User, Integer> {
	 User findByUsername(String pUsername);
	 User findByEmail(String pUsername);
	 @SuppressWarnings("unchecked")
	 User save(User pUser);
}
