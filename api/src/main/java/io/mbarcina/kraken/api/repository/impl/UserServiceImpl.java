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
import io.mbarcina.kraken.auth.entity.User;
import io.mbarcina.kraken.auth.utils.KrakenConstants;


@Repository
public class UserServiceImpl implements IUserService{
	
	@Autowired
	private IUserDAO userDAO;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	
	@Transactional
	public ApiResponse<List<User>> getUserList() throws DAOException {
        LOGGER.info("getUserList - INI");
		List<User> userListResult = userDAO.getUserList();
        LOGGER.info("getUserList - END - User List: " + userListResult);
		return new ApiResponse<List<User>>(userListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<Attendant>> getAttendantList() throws DAOException {
        LOGGER.info("getAttendantList - INI");
		List<Attendant> attendantListResult = userDAO.getAttendantList();
        LOGGER.info("getAttendantList - END - Attendant List: " + attendantListResult);
		return new ApiResponse<List<Attendant>>(attendantListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<Role>> getRoleList() throws DAOException {
        LOGGER.info("getRoleList - INI");
		List<Role> roleListResult = userDAO.getRoleList();
        LOGGER.info("getRoleList - END - User List: " + roleListResult);
		return new ApiResponse<List<Role>>(roleListResult, KrakenConstants.CODE_OK, "");
	}

	@Transactional
	public ApiResponse<List<User>> createUser(User pUser) throws DAOException {
        LOGGER.info("createUser - INI - User: " + pUser);
		List<User> userListResult = userDAO.saveUser(pUser);
        LOGGER.info("createUser - END - User List: " + userListResult);
		return new ApiResponse<List<User>>(userListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<User>> editUser(User pUser) throws DAOException {
        LOGGER.info("editUser - INI - User: " + pUser);
        User userToSave = this.getUserById(pUser.getId());
		
		if (userToSave == null) {
			LOGGER.error("editUser - ERR - User not found");
			return new ApiResponse<List<User>>(null, KrakenConstants.CODE_NOK, "User not found");
		}
		
		userToSave.setEmail(pUser.getEmail());
		userToSave.setUsername(pUser.getUsername());
		userToSave.setRoles(pUser.getRoles());

		List<User> userListResult = userDAO.saveUser(userToSave);
        LOGGER.info("editUser - END - User List: " + userListResult);
		return new ApiResponse<List<User>>(userListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<User>> deleteUser(int pUserId) throws DAOException {
        LOGGER.info("deleteUser - INI - User id: " + pUserId);

		List<User> userListResult = userDAO.deleteUser(pUserId);
        LOGGER.info("deleteUser - END - User List: " + userListResult);
		return new ApiResponse<List<User>>(userListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public User getUserById(int pId) throws DAOException {
		return userDAO.getUserById(pId);
	}
	
	@Transactional
	public Attendant getAttendantById(int pId) throws DAOException {
		return userDAO.getAttendantById(pId);
	}
}
