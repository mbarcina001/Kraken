package io.mbarcina.kraken.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.api.exception.TestException;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.api.utils.KrakenConstants;
import io.mbarcina.kraken.auth.entity.User;

@RestController
@RequestMapping("/test")
public class TestController {
	
	@Autowired
	private IUserService userService;

	/*@RequestMapping(value= {"/"})
	public ResponseEntity<List<User>> hello() throws TestException {
		System.out.println("Greetings Anon");
		List<User> users;
		users = userService.getUserList();
		// throw new TestException("error geting users");
		return ResponseEntity.ok(users);
	}*/
    
    @Secured({KrakenConstants.ROLE_ADMIN})
	@RequestMapping(value= {"/greeting"})
	public String greeting() {
		System.out.println("Greetings my friend");
		return "Greetings my friend";
	}
    
    @Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	@RequestMapping(value= {"/greetinguser"})
	public String greetingUser() {
		System.out.println("Hi user!");
		return "Hi user!";
	}
    
	@RequestMapping(value= {"/"})
	public ResponseEntity<String> greetingPublic() {
		System.out.println("Hi anon!");
		// return "Hi anon!";
		return ResponseEntity.ok("Hi anon!");
	}
}
