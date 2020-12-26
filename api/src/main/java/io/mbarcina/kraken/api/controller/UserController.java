package io.mbarcina.kraken.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.api.entity.Attendant;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.utils.KrakenConstants;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@RequestMapping(method = RequestMethod.GET)
	@Secured({KrakenConstants.ROLE_ADMIN})
	public ApiResponse<List<Attendant>> getUserList() throws DAOException {
		return userService.getUserList();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@Secured({KrakenConstants.ROLE_ADMIN})
	public ApiResponse<List<Attendant>> createUser(@RequestBody Attendant pUser) throws DAOException {
		System.out.println(pUser);
		return userService.createUser(pUser);
	}
	
	@RequestMapping(method = RequestMethod.PUT)
	@Secured({KrakenConstants.ROLE_ADMIN})
	public ApiResponse<List<Attendant>> editUser(@RequestBody Attendant pUser) throws DAOException {
		return userService.editUser(pUser);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	@Secured({KrakenConstants.ROLE_ADMIN})
	public ApiResponse<List<Attendant>> deleteUser(@RequestParam(name = "userId") int pUserId) throws DAOException {		
		return userService.deleteUser(pUserId);
	}
	
	@RequestMapping(value= "/roles", method = RequestMethod.GET)
	@Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	public ApiResponse<List<Role>> getRoles() throws DAOException {
		return userService.getRoleList();
	}
}
