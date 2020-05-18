package io.mbarcina.kraken.auth.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

import io.mbarcina.kraken.auth.service.UserDetailsService;

@Configuration
@EnableAuthorizationServer
@Import(SecurityConfig.class)
public class AuthConfig extends AuthorizationServerConfigurerAdapter {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
    @Qualifier("dataSource")
	private DataSource dataSource;
	
	@Autowired
    private UserDetailsService krakenUserDetailsService;
	  
	@Bean
    public TokenStore tokenStore() {
        return new JdbcTokenStore(dataSource);
    }

	@Bean
    public OAuth2AccessDeniedHandler oauthAccessDeniedHandler() {
        return new OAuth2AccessDeniedHandler();
    }
	
	@Override
    public void configure(AuthorizationServerSecurityConfigurer oauthServer) {
        oauthServer
		    .tokenKeyAccess("permitAll()")
		    .checkTokenAccess("isAuthenticated()")
		    .passwordEncoder(userPasswordEncoder())
		    .allowFormAuthenticationForClients();
    }

	@Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.jdbc(dataSource);
    }
	
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
	        .tokenStore(tokenStore())
	        .authenticationManager(authenticationManager)
	        .userDetailsService(krakenUserDetailsService);
    }

	@Bean
	public PasswordEncoder userPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
