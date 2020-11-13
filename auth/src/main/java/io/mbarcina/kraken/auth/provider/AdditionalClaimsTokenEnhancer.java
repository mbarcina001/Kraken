package io.mbarcina.kraken.auth.provider;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import io.mbarcina.kraken.auth.entity.CustomUserDetails;

@Component
public class AdditionalClaimsTokenEnhancer implements TokenEnhancer {
    
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		Map<String, Object> additional = new HashMap<>();
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		additional.put("email", userDetails.getUsername());
		DefaultOAuth2AccessToken token = (DefaultOAuth2AccessToken) accessToken;
		token.setAdditionalInformation(additional);
		return accessToken;
	}
}
