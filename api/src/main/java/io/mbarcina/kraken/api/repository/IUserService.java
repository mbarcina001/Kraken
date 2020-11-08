package io.mbarcina.kraken.api.repository;

import java.util.List;

import io.mbarcina.kraken.auth.entity.User;

public interface IUserService {
	
	public List<User> getUserList();

}
