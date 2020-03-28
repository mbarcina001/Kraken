package io.mbarcina.kraken.dao;

import java.util.List;

import io.mbarcina.kraken.entity.User;

public interface IUserDAO {
	
	public List<User> getUsers();
	
}