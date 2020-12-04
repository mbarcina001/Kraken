package io.mbarcina.kraken.api.repository;

import java.util.List;

import org.springframework.http.ResponseEntity;

import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

public interface IUserService {
	
	public User getUserById(int pId);
	public List<User> getUserList();
	public List<Role> getRoleList();
	public ResponseEntity<String> saveUser(User pUser);

}
