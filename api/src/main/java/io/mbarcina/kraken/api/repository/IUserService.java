package io.mbarcina.kraken.api.repository;

import java.util.List;

import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

public interface IUserService {
	
	public List<User> getUserList();
	public List<Role> getRoleList();

}
