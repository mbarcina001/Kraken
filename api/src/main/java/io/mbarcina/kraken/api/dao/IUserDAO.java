package io.mbarcina.kraken.api.dao;

import java.util.List;

import io.mbarcina.kraken.api.entity.User;

public interface IUserDAO {
	
	public List<User> getUserList();
	
}