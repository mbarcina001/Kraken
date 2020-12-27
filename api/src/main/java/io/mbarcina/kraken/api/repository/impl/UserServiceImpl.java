package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	
	@Transactional
	public ApiResponse<List<Attendant>> getUserList() throws DAOException {
        LOGGER.info("getUserList - INI");
		List<Attendant> userListResult = userDAO.getUserList();
        LOGGER.info("getUserList - END - User List: " + userListResult);
		return new ApiResponse<List<Attendant>>(userListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<Role>> getRoleList() throws DAOException {
        LOGGER.info("getRoleList - INI");
		List<Role> roleListResult = userDAO.getRoleList();
        LOGGER.info("getRoleList - END - User List: " + roleListResult);
		return new ApiResponse<List<Role>>(roleListResult, KrakenConstants.CODE_OK, "");
	}

	@Transactional
	public ApiResponse<List<Attendant>> createUser(Attendant pUser) throws DAOException {
        LOGGER.info("createUser - INI - User: " + pUser);
		List<Attendant> userListResult = userDAO.saveUser(pUser);
        LOGGER.info("createUser - END - User List: " + userListResult);
		return new ApiResponse<List<Attendant>>(userListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<Attendant>> editUser(Attendant pUser) throws DAOException {
        LOGGER.info("editUser - INI - User: " + pUser);
		Attendant userToSave = this.getUserById(pUser.getId());
		
		if (userToSave == null) {
			LOGGER.error("editUser - ERR - User not found");
			return new ApiResponse<List<Attendant>>(null, KrakenConstants.CODE_NOK, "User not found");
		}
		
		userToSave.setEmail(pUser.getEmail());
		userToSave.setUsername(pUser.getUsername());
		userToSave.setRoles(pUser.getRoles());

		List<Attendant> userListResult = userDAO.saveUser(userToSave);
        LOGGER.info("editUser - END - User List: " + userListResult);
		return new ApiResponse<List<Attendant>>(userListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<Attendant>> deleteUser(int pUserId) throws DAOException {
        LOGGER.info("deleteUser - INI - User id: " + pUserId);

		List<Attendant> userListResult = userDAO.deleteUser(pUserId);
        LOGGER.info("deleteUser - END - User List: " + userListResult);
		return new ApiResponse<List<Attendant>>(userListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public Attendant getUserById(int pId) throws DAOException {
		return userDAO.getUserById(pId);
	}
}
