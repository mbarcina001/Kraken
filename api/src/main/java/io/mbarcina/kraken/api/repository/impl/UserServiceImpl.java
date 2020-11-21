package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
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
	public List<User> getUserList(){
		return userDAO.getUserList();
	}
	
	@Transactional
	public List<Role> getRoleList(){
		return userDAO.getRoleList();
	}

}
