package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IUserDAO;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

@Repository
public class UserServiceImpl implements IUserService{
	
	@Autowired
	private IUserDAO userDAO;
	
	@Transactional
	public User getUserById(int pId) {
		return userDAO.getUserById(pId);
	}
	
	@Transactional
	public List<User> getUserList(){
		return userDAO.getUserList();
	}
	
	@Transactional
	public List<Role> getRoleList(){
		return userDAO.getRoleList();
	}

	@Transactional
	public ResponseEntity<String> saveUser(User pUser) {
		User userToSave = getUserById(pUser.getId());
		
		if (userToSave == null) {
			// throw exception
			return null;
		}
		
		userToSave.setEmail(pUser.getEmail());
		userToSave.setUsername(pUser.getUsername());
		userToSave.setRoles(pUser.getRoles());
		
		return userDAO.saveUser(userToSave);
	}
}
