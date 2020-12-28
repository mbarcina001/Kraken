package io.mbarcina.kraken.api.repository;

import java.util.List;

import io.mbarcina.kraken.api.entity.Attendant;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

public interface IUserService {
	
	public ApiResponse<List<User>> getUserList() throws DAOException;
	public ApiResponse<List<Attendant>> getAttendantList() throws DAOException;
	public ApiResponse<List<Role>> getRoleList() throws DAOException;
	public ApiResponse<List<User>> createUser(User User) throws DAOException;
	public ApiResponse<List<User>> editUser(User User) throws DAOException;
	public ApiResponse<List<User>> deleteUser(int pUserId) throws DAOException;
	public User getUserById(int pUserid) throws DAOException;
	public Attendant getAttendantById(int pUserid) throws DAOException;

}
