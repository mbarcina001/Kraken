package io.mbarcina.kraken.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.repository.IMeetingService;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.auth.utils.KrakenConstants;

@RestController
@RequestMapping("/meeting")
public class MeetingController {
	
	@Autowired
	private IMeetingService meetingService;
	
	@Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	@RequestMapping(method = RequestMethod.GET)
	public ApiResponse<List<Meeting>> getMeetings(OAuth2Authentication pAuthentication) throws DAOException {
		return meetingService.getUserMeetingList(pAuthentication);
	}
	
	@Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	@RequestMapping(method = RequestMethod.POST)
	public ApiResponse<List<Meeting>> createMeeting(OAuth2Authentication pAuthentication, @RequestBody Meeting pMeeting) throws DAOException {
		return meetingService.createMeeting(pAuthentication, pMeeting);
	}
	
	@Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	@RequestMapping(method = RequestMethod.PUT)
	public ApiResponse<List<Meeting>> editMeeting(OAuth2Authentication pAuthentication, @RequestBody Meeting pMeeting) throws DAOException {
		return meetingService.editMeeting(pAuthentication, pMeeting);
	}
	
	@Secured({KrakenConstants.ROLE_ADMIN, KrakenConstants.ROLE_USER})
	@RequestMapping(method = RequestMethod.DELETE)
	public ApiResponse<List<Meeting>> deleteMeeting(OAuth2Authentication authentication, @RequestParam(name = "meetingId") int pMeetingId) throws DAOException {
		return meetingService.deleteMeeting(authentication, pMeetingId);
	}

}
