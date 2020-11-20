package io.mbarcina.kraken.auth.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CustomUserDetails implements UserDetails, Serializable {

	private static final long serialVersionUID = 1424968907281392220L;
	private int id;
	private String username;
	private String password;
	private List<GrantedAuthority> grantedAuthorities;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return this.username;
	}
	
	public void setUsername(String pUsername) {
		this.username = pUsername;
	}
	
	public String getPassword() {
		return this.password;
	}
	
	public void setPassword(String pPassword) {
		this.password = pPassword;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.grantedAuthorities;
	}
	
	public void setAuthorities(List<GrantedAuthority> pGrantedAuthorities) {
		this.grantedAuthorities = pGrantedAuthorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public String toString() {
		return "CustomUserDetails [id=" + id + ", username=" + username + ", password=" + password + ", grantedAuthorities="
				+ grantedAuthorities + "]";
	}
}
