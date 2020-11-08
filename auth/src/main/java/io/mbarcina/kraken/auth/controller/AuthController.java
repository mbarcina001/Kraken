package io.mbarcina.kraken.auth.controller;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.auth.model.RegisterRequestModel;
import io.mbarcina.kraken.auth.model.UserModel;
import io.mbarcina.kraken.auth.service.UserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UserDetailsService users;

    
    @PostMapping("/register")
    public UserModel register(@RequestBody RegisterRequestModel data) {
    	String mail = data.getEmail();
    	
    	try {
    		this.users.loadUserByUsername(mail);
    	} catch (UsernameNotFoundException e) {
    		// TODO: Register
        	List<String> roles = new ArrayList<String>();
        	return new UserModel(mail, data.getUsername(), "test", roles);
    	}
    	
		throw new BadCredentialsException("Username already in use");
    }
}
