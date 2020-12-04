package io.mbarcina.kraken.api.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IUserDAO;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

@Repository
public class UserDAOImpl implements IUserDAO{
	
	@Autowired
	private EntityManager entityManager;
	
	@Transactional
	public User getUserById(int pId) {
		// Create a query
		TypedQuery<User> theQuery = entityManager.createQuery("from User WHERE id=" + pId, User.class);
		
		// Get the result list
		User user = theQuery.getSingleResult();
		
		return user;
	}
	
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
	
	/*@Transactional
	public boolean saveUser(User pUser) {
		try {
			entityManager.persist(pUser);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}*/
	

	
	@Transactional
	public ResponseEntity<String> saveUser(User pUser) {
		try {
			entityManager.persist(pUser);
			return ResponseEntity.status(HttpStatus.OK).body("User edition OK");
		} catch(Exception e) {
			// throw exception
			return null;
		}
		
		/*User userToEdit = entityManager.find( User.class, pUser.getId());
		
		if (userToEdit != null){
			userToEdit.setUsername(pUser.getUsername());
			userToEdit.setEmail(pUser.getEmail());
			// userToEdit.setRoles(pUser.getRoles());

			entityManager.persist(userToEdit);

            return true;
        }else{
            return false;
        }*/
		
		/*entityManager.getTransaction().begin();
		User user = entityManager.find( User.class, pUser.getId() );
		business.setBusinessId(BusinessRole.getBusiness.getBusinessId);
		entityManager.persist(business);
		entityManager.getTransaction().commit();
		entityManager.close();*/
	}

}
