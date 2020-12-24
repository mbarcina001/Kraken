package io.mbarcina.kraken.auth.controller;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.auth.entity.User;
import io.mbarcina.kraken.auth.response.ApiResponse;
import io.mbarcina.kraken.auth.service.UserDetailsService;

@RestController
public class AuthController implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UserDetailsService users;

	@RequestMapping(value= "/register", method = RequestMethod.POST)
    public ApiResponse<User> register(User pUser) {
    	return this.users.registerUser(pUser);
    }
}
