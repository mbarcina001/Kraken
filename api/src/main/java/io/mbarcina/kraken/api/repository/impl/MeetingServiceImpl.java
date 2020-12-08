package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IMeetingDAO;
import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.repository.IMeetingService;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.api.utils.KrakenConstants;
import io.mbarcina.kraken.auth.entity.CustomUserDetails;
import io.mbarcina.kraken.auth.entity.User;

@Repository
public class MeetingServiceImpl implements IMeetingService{
	
	@Autowired
	private IMeetingDAO meetingDAO;
	
	@Transactional
	private List<Meeting> _getUserMeetingList(OAuth2Authentication pAuthentication) throws DAOException{
		int userId = ((CustomUserDetails) pAuthentication.getPrincipal()).getId();
		return meetingDAO.getUserMeetingList(userId);
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> getUserMeetingList(OAuth2Authentication pAuthentication){
		try {
			return new ApiResponse<List<Meeting>>(this._getUserMeetingList(pAuthentication), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> createMeeting(OAuth2Authentication pAuthentication, Meeting pMeeting){
		User authedUser = ((User) pAuthentication.getPrincipal());
		pMeeting.setOrganiser(authedUser);
		try {
			return new ApiResponse<List<Meeting>>(meetingDAO.persistMeeting(pMeeting, authedUser.getId()), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> editMeeting(OAuth2Authentication pAuthentication, Meeting pMeeting){
		int authedUserId = ((CustomUserDetails) pAuthentication.getPrincipal()).getId();
		if (pMeeting.getOrganiser().getId() == authedUserId) {
			try {
				return new ApiResponse<List<Meeting>>(meetingDAO.persistMeeting(pMeeting, authedUserId), KrakenConstants.CODE_OK, "");
			} catch (DAOException e) {
				return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
			}
		}
		
		try {
			return new ApiResponse<List<Meeting>>(this._getUserMeetingList(pAuthentication), KrakenConstants.CODE_NOK, "No permissions to edit this meeting");
		} catch (DAOException e) {
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> deleteMeeting(OAuth2Authentication pAuthentication, Meeting pMeeting){
		int authedUserId = ((CustomUserDetails) pAuthentication.getPrincipal()).getId();
		if (pMeeting.getOrganiser().getId() == authedUserId) {
			try {
				return new ApiResponse<List<Meeting>>(meetingDAO.deleteMeeting(pMeeting, authedUserId), KrakenConstants.CODE_OK, "");
			} catch (DAOException e) {
				return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
			}
		}
		
		try {
			return new ApiResponse<List<Meeting>>(this._getUserMeetingList(pAuthentication), KrakenConstants.CODE_NOK, "No permissions to delete this meeting");
		} catch (DAOException e) {
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}

}
