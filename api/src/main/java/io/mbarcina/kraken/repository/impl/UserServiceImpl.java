package io.mbarcina.kraken.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.dao.IUserDAO;
import io.mbarcina.kraken.entity.User;
import io.mbarcina.kraken.repository.IUserService;

@Repository
public class UserServiceImpl implements IUserService{
	
	@Autowired
	private IUserDAO userDAO;
	
	@Transactional
	public List<User> getUsers(){
		return userDAO.getUsers();
	}

}
