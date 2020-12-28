package io.mbarcina.kraken.api.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IUserDAO;
import io.mbarcina.kraken.api.entity.Attendant;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

@Repository
public class UserDAOImpl implements IUserDAO {

	@Autowired
	private EntityManager entityManager;
	
    private static final Logger LOGGER = LoggerFactory.getLogger(UserDAOImpl.class);

	@Transactional
	public User getUserById(int pId) throws DAOException {
		try {
			// Create a query
			TypedQuery<User> theQuery = entityManager.createQuery("from User WHERE id=" + pId, User.class);
	
			// Get the result list
			User user = theQuery.getSingleResult();
	
			return user;
		} catch (Exception e) {
			LOGGER.error("getUserById - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error retrieving user with id " + pId + ": " + e.getMessage());
		}
	}

	@Transactional
	public Attendant getAttendantById(int pId) throws DAOException {
		try {
			// Create a query
			TypedQuery<Attendant> theQuery = entityManager.createQuery("from Attendant WHERE id=" + pId, Attendant.class);
	
			// Get the result list
			Attendant user = theQuery.getSingleResult();
	
			return user;
		} catch (Exception e) {
			LOGGER.error("getAttendantById - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error retrieving attendant with id " + pId + ": " + e.getMessage());
		}
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
			LOGGER.error("getAttendantById - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error retrieving users: " + e.getMessage());
		}
	}

	@Transactional
	public List<Attendant> getAttendantList() throws DAOException {
		try {
			// Create a query
			TypedQuery<Attendant> theQuery = entityManager.createQuery("from Attendant", Attendant.class);

			// Get the result list
			List<Attendant> users = theQuery.getResultList();

			return users;
		} catch (Exception e) {
			LOGGER.error("getAttendantById - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error retrieving attendants: " + e.getMessage());
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
			LOGGER.error("getAttendantById - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error retrieving roles: " + e.getMessage());
		}
	}

	@Transactional
	public List<User> saveUser(User pUser) throws DAOException {
		try {
			entityManager.persist(pUser);
			return this.getUserList();
		} catch (Exception e) {
			LOGGER.error("getAttendantById - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error saving user: " + e.getMessage());
		}
	}

	@Transactional
	public List<User> deleteUser(int pUserId) throws DAOException {
		try {
			entityManager.createQuery("DELETE FROM User where id=" + pUserId).executeUpdate();
			return this.getUserList();
		} catch (Exception e) {
			LOGGER.error("getAttendantById - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error deleting user with id " + pUserId + ": " + e.getMessage());
		}
	}

}
