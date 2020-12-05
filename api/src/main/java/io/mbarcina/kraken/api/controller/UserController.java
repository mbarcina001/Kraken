package io.mbarcina.kraken.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.exception.TestException;
import io.mbarcina.kraken.api.repository.IMeetingService;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.api.utils.KrakenConstants;
import io.mbarcina.kraken.auth.entity.CustomUserDetails;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IMeetingService meetingService;

	@Secured({KrakenConstants.ROLE_ADMIN})
	@RequestMapping(value= {"/list"})
	public ResponseEntity<List<User>> getUserList() throws TestException {
		List<User> users = userService.getUserList();
		return ResponseEntity.ok(users);
	}
	
	@Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	@RequestMapping(value= {"/meetings"})
	public ResponseEntity<List<Meeting>> getMeetings(OAuth2Authentication authentication) throws TestException {
		int id = ((CustomUserDetails) authentication.getPrincipal()).getId();
		List<Meeting> meetings = meetingService.getUserMeetingList(id);
		return ResponseEntity.ok(meetings);
	}
	
	@Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	@RequestMapping(value= {"/roles/list"})
	public ResponseEntity<List<Role>> getRoles() throws TestException {
		List<Role> roles = userService.getRoleList();
		return ResponseEntity.ok(roles);
	}
	
	// @Secured({KrakenConstants.ROLE_ADMIN})
	@RequestMapping(value= {"/edit"})
	public ResponseEntity<String> editUser(@RequestBody User user) throws TestException {		
		return userService.saveUser(user);
	}
}
