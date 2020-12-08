package io.mbarcina.kraken.api.dao;

import java.util.List;

import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

public interface IUserDAO {
	
	public User getUserById(int pId) throws DAOException;
	public List<User> getUserList() throws DAOException;
	public List<Role> getRoleList() throws DAOException;
	public List<User> saveUser(User pUser) throws DAOException;
	public List<User> deleteUser(int pUserId) throws DAOException;
}