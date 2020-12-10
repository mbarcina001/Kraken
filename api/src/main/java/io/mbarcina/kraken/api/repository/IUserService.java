package io.mbarcina.kraken.api.repository;

import java.util.List;

import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.auth.entity.Role;
import io.mbarcina.kraken.auth.entity.User;

public interface IUserService {
	
	public ApiResponse<List<User>> getUserList();
	public ApiResponse<List<Role>> getRoleList();
	public ApiResponse<List<User>> createUser(User pUser) throws DAOException;
	public ApiResponse<List<User>> editUser(User pUser);
	public ApiResponse<List<User>> deleteUser(int pUserId);

}
