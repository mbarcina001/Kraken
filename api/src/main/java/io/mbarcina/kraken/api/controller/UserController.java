package io.mbarcina.kraken.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.api.entity.User;
import io.mbarcina.kraken.api.repository.IUserService;

@RestController
@RequestMapping("api/users")
public class UserController {
	
	@Autowired
	private IUserService userService;

	@RequestMapping(value= {"/"})
	public List<User> hello() {
		List<User> users;
		users = userService.getUsers();
		return users;
	}
}
