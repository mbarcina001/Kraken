package io.mbarcina.kraken.api.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IUserDAO;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

@Repository
public class UserDAOImpl implements IUserDAO {

	@Autowired
	private EntityManager entityManager;

	@Transactional
	public User getUserById(int pId) throws DAOException {
		// Create a query
		TypedQuery<User> theQuery = entityManager.createQuery("from User WHERE id=" + pId, User.class);

		// Get the result list
		User user = theQuery.getSingleResult();

		return user;
	}

	@Transactional
	public List<User> getUserList() throws DAOException {
		try {
			// Create a query
			TypedQuery<User> theQuery = entityManager.createQuery("from User", User.class);

			// Get the result list
			List<User> users = theQuery.getResultList();

			return users;
		} catch (Exception e) {
			throw new DAOException("Error retrieving meetings");
		}
	}

	@Transactional
	public List<Role> getRoleList() throws DAOException {
		try {
			// Create a query
			TypedQuery<Role> theQuery = entityManager.createQuery("from Role", Role.class);

			// Get the result list
			List<Role> roles = theQuery.getResultList();

			return roles;
		} catch (Exception e) {
			throw new DAOException("Error retrieving meetings");
		}
	}

	@Transactional
	public List<User> saveUser(User pUser) throws DAOException {
		try {
			entityManager.persist(pUser);
			return this.getUserList();
		} catch (Exception e) {
			throw new DAOException("Error retrieving meetings");
		}
	}

	@Transactional
	public List<User> deleteUser(int pUserId) throws DAOException {
		try {
			entityManager.createQuery("DELETE FROM User where id=" + pUserId).executeUpdate();
			return this.getUserList();
		} catch (Exception e) {
			throw new DAOException("Error retrieving meetings");
		}
	}

}
