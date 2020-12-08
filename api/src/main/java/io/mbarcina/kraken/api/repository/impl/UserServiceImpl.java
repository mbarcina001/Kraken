package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IUserDAO;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.api.utils.KrakenConstants;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;


@Repository
public class UserServiceImpl implements IUserService{
	
	@Autowired
	private IUserDAO userDAO;
	
	@Transactional
	public ApiResponse<List<User>> getUserList(){
		try {
			return new ApiResponse<List<User>>(userDAO.getUserList(), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<User>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<Role>> getRoleList(){
		try {
			return new ApiResponse<List<Role>>(userDAO.getRoleList(), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Role>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}

	@Transactional
	public ApiResponse<List<User>> createUser(User pUser) {		
		try {
			return new ApiResponse<List<User>>(userDAO.saveUser(pUser), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<User>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<User>> editUser(User pUser) {	
		try {
			User userToSave = this._getUserById(pUser.getId());
			
			if (userToSave == null) {
				return new ApiResponse<List<User>>(null, KrakenConstants.CODE_NOK, "User not found");
			}
			
			userToSave.setEmail(pUser.getEmail());
			userToSave.setUsername(pUser.getUsername());
			userToSave.setRoles(pUser.getRoles());
			
			return new ApiResponse<List<User>>(userDAO.saveUser(userToSave), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<User>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<User>> deleteUser(int pUserId) {
		try {
			return new ApiResponse<List<User>>(userDAO.deleteUser(pUserId), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<User>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	private User _getUserById(int pId) throws DAOException {
		return userDAO.getUserById(pId);
	}
}
