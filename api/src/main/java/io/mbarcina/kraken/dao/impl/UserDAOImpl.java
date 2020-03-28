package io.mbarcina.kraken.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.dao.IUserDAO;
import io.mbarcina.kraken.entity.User;

@Repository
public class UserDAOImpl implements IUserDAO{
	
	@Autowired
	private EntityManager entityManager;
	
	@Transactional
	public List<User> getUsers() {
		// Create a query
		TypedQuery<User> theQuery = entityManager.createQuery("from User", User.class);
		
		// Get the result list
		List<User> users = theQuery.getResultList();
		
		return users;
	}
}
