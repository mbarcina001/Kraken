package io.mbarcina.kraken.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.entity.User;
import io.mbarcina.kraken.repository.IUserService;

@RestController
public class HelloController {
	
	@Autowired
	private IUserService userService;

	@RequestMapping(value= {"/"})
	public List<User> hello() {
		List<User> users;
		users = userService.getUsers();
		return users;
	}
}
