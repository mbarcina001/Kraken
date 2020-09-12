package io.mbarcina.kraken.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.auth.entity.User;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
	 User findOneByUsername(String username);
	 User findByEmail(String username);
}
