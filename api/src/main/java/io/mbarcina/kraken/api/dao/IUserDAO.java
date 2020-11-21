package io.mbarcina.kraken.api.dao;

import java.util.List;

import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

public interface IUserDAO {
	
	public List<User> getUserList();
	public List<Role> getRoleList();
	
}