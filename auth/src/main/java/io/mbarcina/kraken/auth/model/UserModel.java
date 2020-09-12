package io.mbarcina.kraken.auth.model;

import java.util.List;

public class UserModel {
	
	private String email;
	private String username;
	private String token;
	private List<String> roles;
	
	public UserModel(String email, String username, String token, List<String> roles) {
		super();
		this.email = email;
		this.username = username;
		this.token = token;
		this.roles = roles;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public List<String> getRoles() {
		return roles;
	}
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
	

}
