package io.mbarcina.kraken.auth.controller;

import static java.util.stream.Collectors.toList;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.auth.model.AuthenticationRequestModel;
import io.mbarcina.kraken.auth.model.UserModel;
import io.mbarcina.kraken.auth.provider.JwtTokenProvider;
import io.mbarcina.kraken.auth.service.UserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    JwtTokenProvider jwtTokenProvider;
    
    @Autowired
    UserDetailsService users;
    
    @PostMapping("/signin")
    public UserModel signin(@RequestBody AuthenticationRequestModel data) {
        try {
        	// Get User
            String username = data.getUsername();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            UserDetails user = this.users.loadUserByUsername(username);
            
            // Get roles
            List<String> roles = user
	            .getAuthorities()
	            .stream()
	            .map(a -> ((GrantedAuthority) a).getAuthority())
	            .collect(toList());
            
            // Create token
            String token = jwtTokenProvider.createToken(username, roles);
            
            // Return User
            return new UserModel(username, user.getUsername(), token, roles);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }
}
