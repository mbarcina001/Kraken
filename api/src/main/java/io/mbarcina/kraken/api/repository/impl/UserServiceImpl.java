package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IUserDAO;
import io.mbarcina.kraken.api.entity.Attendant;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.utils.KrakenConstants;


@Repository
public class UserServiceImpl implements IUserService{
	
	@Autowired
	private IUserDAO userDAO;
	
	@Transactional
	public ApiResponse<List<Attendant>> getUserList(){
		try {
			return new ApiResponse<List<Attendant>>(userDAO.getUserList(), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Attendant>>(null, KrakenConstants.CODE_NOK, e.getMessage());
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
	public ApiResponse<List<Attendant>> createUser(Attendant pUser) throws DAOException{
		return new ApiResponse<List<Attendant>>(userDAO.saveUser(pUser), KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<Attendant>> editUser(Attendant pUser) {	
		try {
			Attendant userToSave = this.getUserById(pUser.getId());
			
			if (userToSave == null) {
				return new ApiResponse<List<Attendant>>(null, KrakenConstants.CODE_NOK, "User not found");
			}
			
			userToSave.setEmail(pUser.getEmail());
			userToSave.setUsername(pUser.getUsername());
			userToSave.setRoles(pUser.getRoles());
			
			return new ApiResponse<List<Attendant>>(userDAO.saveUser(userToSave), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Attendant>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<Attendant>> deleteUser(int pUserId) {
		try {
			return new ApiResponse<List<Attendant>>(userDAO.deleteUser(pUserId), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Attendant>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public Attendant getUserById(int pId) throws DAOException {
		return userDAO.getUserById(pId);
	}
}
