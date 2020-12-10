package io.mbarcina.kraken.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.api.utils.KrakenConstants;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@RequestMapping(method = RequestMethod.GET)
	@Secured({KrakenConstants.ROLE_ADMIN})
	public ApiResponse<List<User>> getUserList() throws DAOException {
		return userService.getUserList();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	// @Secured({KrakenConstants.ROLE_ADMIN})
	public ApiResponse<List<User>> createUser(@RequestBody User user) throws DAOException {
		System.out.println(user);
		return userService.createUser(user);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	// @Secured({KrakenConstants.ROLE_ADMIN})DAOException
	public ApiResponse<List<User>> editUser(@RequestBody User user) throws DAOException {	
		System.out.println(user);	
		return userService.editUser(user);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	// @Secured({KrakenConstants.ROLE_ADMIN})
	public ApiResponse<List<User>> deleteUser(@RequestParam(name = "userId") int userId) throws DAOException {		
		return userService.deleteUser(userId);
	}
	
	@Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	@RequestMapping(value= "/roles", method = RequestMethod.GET)
	public ApiResponse<List<Role>> getRoles() throws DAOException {
		return userService.getRoleList();
	}
}
