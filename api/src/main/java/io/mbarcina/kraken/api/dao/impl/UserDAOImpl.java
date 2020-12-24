package io.mbarcina.kraken.api.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IUserDAO;
import io.mbarcina.kraken.api.entity.Attendant;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.auth.entity.Role;

@Repository
public class UserDAOImpl implements IUserDAO {

	@Autowired
	private EntityManager entityManager;

	@Transactional
	public Attendant getUserById(int pId) throws DAOException {
		// Create a query
		TypedQuery<Attendant> theQuery = entityManager.createQuery("from User WHERE id=" + pId, Attendant.class);

		// Get the result list
		Attendant user = theQuery.getSingleResult();

		return user;
	}

	@Transactional
	public List<Attendant> getUserList() throws DAOException {
		try {
			// Create a query
			TypedQuery<Attendant> theQuery = entityManager.createQuery("from User", Attendant.class);

			// Get the result list
			List<Attendant> users = theQuery.getResultList();

			return users;
		} catch (Exception e) {
			throw new DAOException("Error retrieving users");
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
			throw new DAOException("Error retrieving roles");
		}
	}

	@Transactional
	public List<Attendant> saveUser(Attendant pUser) throws DAOException {
		try {
			entityManager.persist(pUser);
			return this.getUserList();
		} catch (Exception e) {
			throw new DAOException("Error saving user");
		}
	}

	@Transactional
	public List<Attendant> deleteUser(int pUserId) throws DAOException {
		try {
			entityManager.createQuery("DELETE FROM User where id=" + pUserId).executeUpdate();
			return this.getUserList();
		} catch (Exception e) {
			throw new DAOException("Error deleting user");
		}
	}

}
