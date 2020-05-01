package io.mbarcina.kraken.auth.repository.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.mbarcina.kraken.auth.dao.IUserDAO;
import io.mbarcina.kraken.auth.entity.CustomUserDetails;
import io.mbarcina.kraken.auth.entity.User;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private IUserDAO userDao;

	@Override
	public UserDetails loadUserByUsername(String username) {
		User user = userDao.findByUsername(username);
		if (user != null) {
			CustomUserDetails customUserDetails = new CustomUserDetails();
			customUserDetails.setUsername(user.getUsername());
			customUserDetails.setPassword(user.getPassword());
			/*Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
			for (UserAuthority authority : user.getUserAuthorities()) {
				authorities.add(new CustomGrantedAuthority(authority.getAuthority().getName()));
			}
			customUserDetails.setGrantedAuthorities(authorities);*/
			return customUserDetails;
		}
		throw new UsernameNotFoundException("Username or password wrong");
	}

}
