package io.mbarcina.kraken.api.repository;

import java.util.List;

import io.mbarcina.kraken.api.entity.Attendant;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.auth.entity.Role;

public interface IUserService {
	
	public ApiResponse<List<Attendant>> getUserList();
	public ApiResponse<List<Role>> getRoleList();
	public ApiResponse<List<Attendant>> createUser(Attendant pUser) throws DAOException;
	public ApiResponse<List<Attendant>> editUser(Attendant pUser);
	public ApiResponse<List<Attendant>> deleteUser(int pUserId);
	public Attendant getUserById(int pUserid) throws DAOException;

}
