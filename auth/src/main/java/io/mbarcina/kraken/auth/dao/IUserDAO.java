package io.mbarcina.kraken.auth.dao;

import io.mbarcina.kraken.auth.entity.User;

public interface IUserDAO {
	
	public User findByUsername(String username);
	
}