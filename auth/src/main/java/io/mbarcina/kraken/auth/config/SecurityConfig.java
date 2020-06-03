package io.mbarcina.kraken.auth.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Order(-1)
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
	    return super.authenticationManagerBean();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		/*http
			.cors().and()
			.anonymous().disable()
	        .requestMatchers().antMatchers("/about/**")
	        .and().authorizeRequests()
	        .antMatchers(HttpMethod.OPTIONS, "/oauth/token").permitAll()
	        .antMatchers(HttpMethod.POST, "/oauth/token").permitAll()
	        .antMatchers("/about/**").access("hasRole('ADMIN')")
	        .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());*/
		
		http.requestMatchers().antMatchers(HttpMethod.OPTIONS, "/oauth/token", "/rest/**")
        .and()
            .csrf().disable()
        .authorizeRequests().anyRequest().permitAll()
        .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
	}
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://example.com"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}