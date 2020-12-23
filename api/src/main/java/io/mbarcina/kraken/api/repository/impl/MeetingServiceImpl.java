package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IMeetingDAO;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.repository.IMeetingService;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.api.utils.KrakenConstants;
import io.mbarcina.kraken.auth.entity.CustomUserDetails;
import io.mbarcina.kraken.auth.entity.Meeting;
import io.mbarcina.kraken.auth.entity.User;

@Repository
public class MeetingServiceImpl implements IMeetingService{
	
	@Autowired
	private IMeetingDAO meetingDAO;
	
	@Autowired
	private IUserService userService;
	
	@Transactional
	private List<Meeting> _getUserMeetingList(OAuth2Authentication pAuthentication) throws DAOException{
		int userId = ((CustomUserDetails) pAuthentication.getPrincipal()).getId();
		return meetingDAO.getUserMeetingList(userId);
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> getUserMeetingList(OAuth2Authentication pAuthentication){
		try {
			List<Meeting> meetings = this._getUserMeetingList(pAuthentication);
			return new ApiResponse<List<Meeting>>(meetings, KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> createMeeting(OAuth2Authentication pAuthentication, Meeting pMeeting){
		try {
			User authedUser = userService.getUserById(((CustomUserDetails) pAuthentication.getPrincipal()).getId());
			pMeeting.setOrganiser(authedUser);
			List<Meeting> meetings = meetingDAO.persistMeeting(pMeeting, authedUser.getId());
			pMeeting.addAttendant(authedUser);
			return new ApiResponse<List<Meeting>>(meetings, KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> editMeeting(OAuth2Authentication pAuthentication, Meeting pMeeting){
		try {
			System.out.println(pMeeting);
			Meeting meetingToSave = this._getMeetingById(pMeeting.getId());
			
			if (meetingToSave == null) {
				return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, "Meeting not found");
			}
			
			meetingToSave.setDescription(pMeeting.getDescription());
			meetingToSave.setMeetingStartDate(pMeeting.getMeetingStartDate());
			meetingToSave.setMeetingEndDate(pMeeting.getMeetingEndDate());
			meetingToSave.setAttendantList(pMeeting.getAttendantList());
			
			int authedUserId = ((CustomUserDetails) pAuthentication.getPrincipal()).getId();
			if (pMeeting.getOrganiser().getId() != authedUserId) {
				return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, "No permissions to edit this meeting");
			}
			
			return new ApiResponse<List<Meeting>>(meetingDAO.persistMeeting(meetingToSave, authedUserId), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> deleteMeeting(OAuth2Authentication pAuthentication, int pMeetingId){
		try {
			Meeting meetingToSave = this._getMeetingById(pMeetingId);
			
			if (meetingToSave == null) {
				return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, "Meeting not found");
			}
			
			int authedUserId = ((CustomUserDetails) pAuthentication.getPrincipal()).getId();
			if (meetingToSave.getOrganiser().getId() != authedUserId) {
				return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, "No permissions to delete this meeting");
			}
			
			return new ApiResponse<List<Meeting>>(meetingDAO.deleteMeeting(pMeetingId, authedUserId), KrakenConstants.CODE_OK, "");
		} catch (DAOException e) {
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, e.getMessage());
		}
	}
	
	@Transactional
	private Meeting _getMeetingById(int pId) throws DAOException {
		return meetingDAO.getMeetingById(pId);
	}

}
