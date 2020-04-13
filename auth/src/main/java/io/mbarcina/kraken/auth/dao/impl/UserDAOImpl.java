package io.mbarcina.kraken.auth.dao.impl;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.auth.dao.IUserDAO;
import io.mbarcina.kraken.auth.entity.User;

@Repository
public class UserDAOImpl implements IUserDAO{
	
	@Autowired
	private EntityManager entityManager;
	
	@Transactional
	public User findByUsername(String username) {
		// Create a query
		TypedQuery<User> theQuery = entityManager.createQuery("from User WHERE u.userName = ?1", User.class)
			.setParameter(1, username);
		
		// Get the result
		User user = theQuery.getSingleResult();
		
		return user;
	}
}
