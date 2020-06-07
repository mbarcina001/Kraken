package io.mbarcina.kraken.api.controller;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.api.utils.KrakenConstants;

@RestController
@RequestMapping("/")
public class TestController {
    
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
	public String greetingPublic() {
		System.out.println("Hi anon!");
		return "Hi anon!";
	}
}
