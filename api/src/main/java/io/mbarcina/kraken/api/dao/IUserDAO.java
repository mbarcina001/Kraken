package io.mbarcina.kraken.api.dao;

import java.util.List;

import io.mbarcina.kraken.api.entity.Attendant;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.auth.entity.Role;

public interface IUserDAO {
	
	public Attendant getUserById(int pId) throws DAOException;
	public List<Attendant> getUserList() throws DAOException;
	public List<Role> getRoleList() throws DAOException;
	public List<Attendant> saveUser(Attendant pUser) throws DAOException;
	public List<Attendant> deleteUser(int pUserId) throws DAOException;
}