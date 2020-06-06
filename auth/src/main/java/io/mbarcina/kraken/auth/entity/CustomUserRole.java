package io.mbarcina.kraken.auth.entity;

import java.io.Serializable;

import org.springframework.security.core.GrantedAuthority;

public class CustomUserRole implements GrantedAuthority, Serializable{
	
	private static final long serialVersionUID = -5132282820444300947L;
	private String name;
	
	public CustomUserRole(String name) {
		this.name = name;
	}
	
	@Override
	public String getAuthority() {
		return name;
	}

}
