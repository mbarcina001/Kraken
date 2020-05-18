package io.mbarcina.kraken.auth.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.mbarcina.kraken.auth.entity.CustomUserDetails;
import io.mbarcina.kraken.auth.entity.User;
import io.mbarcina.kraken.auth.repository.IUserRepository;

@Service("krakenUserDetailsService")
@Transactional
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

	@Autowired
	private IUserRepository userRepository;

	public UserDetails loadUserByUsername(String username) {
		User user = userRepository.findOneByUsername(username);
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
