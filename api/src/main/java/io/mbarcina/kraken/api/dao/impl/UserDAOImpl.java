package io.mbarcina.kraken.api.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IUserDAO;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

@Repository
public class UserDAOImpl implements IUserDAO{
	
	@Autowired
	private EntityManager entityManager;
	
	@Transactional
	public List<User> getUserList() {
		// Create a query
		TypedQuery<User> theQuery = entityManager.createQuery("from User", User.class);
		
		// Get the result list
		List<User> users = theQuery.getResultList();
		
		return users;
	}
	
	@Transactional
	public List<Role> getRoleList() {
		// Create a query
		TypedQuery<Role> theQuery = entityManager.createQuery("from Role", Role.class);
		
		// Get the result list
		List<Role> roles = theQuery.getResultList();
		
		return roles;
	}
}
