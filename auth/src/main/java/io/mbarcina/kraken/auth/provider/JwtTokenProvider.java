package io.mbarcina.kraken.auth.provider;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


import io.mbarcina.kraken.auth.exception.InvalidJwtAuthenticationException;
import io.mbarcina.kraken.auth.service.UserDetailsService;

@Component
public class JwtTokenProvider {
	
    @Value("${security.jwt.token.secret-key}")
    private String secretKey;
    
    @Value("${security.jwt.token.expire-length}")
    private long validityInMilliseconds;
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }
    
    public String createToken(String username, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(username); // Creates JSON map adding key "sub" and value username
        claims.put("roles", roles); // Adds roles
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);
        return Jwts.builder() //
            .setClaims(claims) // Sets user role map
            .setIssuedAt(now) // Sets Issue datetime
            .setExpiration(validity) // Sets expiration time
            .signWith(SignatureAlgorithm.HS256, secretKey) // Signs the JWT key
            .compact(); // Builds and serializes JWT
    }
    
    public Authentication getAuthentication(String token) {
    	// Gets user details from token
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));
        // Returns authentication implementation with user, password and roles
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    
    public String getUsername(String token) {
    	// Gets username from token
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }
    
    public String resolveToken(HttpServletRequest req) {
    	// Gets token from http request header
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
    
    public boolean validateToken(String token) throws InvalidJwtAuthenticationException{
        try {
        	// Parses JWT token to Claims object (map) using secret key
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            
            // Checks expiration date
            if (claims.getBody().getExpiration().before(new Date())) {
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidJwtAuthenticationException("Expired or invalid JWT token");
        }
    }
}