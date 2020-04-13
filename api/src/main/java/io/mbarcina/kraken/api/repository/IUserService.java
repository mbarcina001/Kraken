package io.mbarcina.kraken.api.repository;

import java.util.List;

import io.mbarcina.kraken.api.entity.User;

public interface IUserService {
	
	public List<User> getUsers();

}
