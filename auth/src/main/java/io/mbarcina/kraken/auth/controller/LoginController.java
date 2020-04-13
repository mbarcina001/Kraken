package io.mbarcina.kraken.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("oauth/login")
public class LoginController {
	
	@RequestMapping(value= {"/"})
	public String login() {
		return "Response from login controller";
	}

}
