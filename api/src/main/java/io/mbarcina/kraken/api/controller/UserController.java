package io.mbarcina.kraken.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.api.entity.User;
import io.mbarcina.kraken.api.exception.TestException;
import io.mbarcina.kraken.api.repository.IUserService;

@RestController
@RequestMapping("api/users")
public class UserController {
	
	@Autowired
	private IUserService userService;

	@RequestMapping(value= {"/"})
	public ResponseEntity<List<User>> hello() throws TestException {
		List<User> users;
		users = userService.getUserList();
		throw new TestException("error geting users");
		// return ResponseEntity.ok(users);
	}
}
