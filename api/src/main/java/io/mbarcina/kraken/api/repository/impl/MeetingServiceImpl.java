package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IMeetingDAO;
import io.mbarcina.kraken.api.entity.Attendant;
import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.exception.DAOException;
import io.mbarcina.kraken.api.repository.IMeetingService;
import io.mbarcina.kraken.api.repository.IUserService;
import io.mbarcina.kraken.api.response.ApiResponse;
import io.mbarcina.kraken.auth.entity.CustomUserDetails;
import io.mbarcina.kraken.auth.utils.KrakenConstants;

@Repository
public class MeetingServiceImpl implements IMeetingService{
	
	@Autowired
	private IMeetingDAO meetingDAO;
	
	@Autowired
	private IUserService userService;
	
    private static final Logger LOGGER = LoggerFactory.getLogger(MeetingServiceImpl.class);
	
	@Transactional
	private List<Meeting> _getUserMeetingList(OAuth2Authentication pAuthentication) throws DAOException {
        LOGGER.info("_getUserMeetingList - INI - Authentication: " + pAuthentication);
		int userId = ((CustomUserDetails) pAuthentication.getPrincipal()).getId();
		List<Meeting> meetingListResult = meetingDAO.getUserMeetingList(userId);
        LOGGER.info("_getUserMeetingList - END - Meeting List: " + meetingListResult);
		return meetingListResult;
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> getUserMeetingList(OAuth2Authentication pAuthentication) throws DAOException {
        LOGGER.info("getUserMeetingList - INI - Authentication: " + pAuthentication);
		List<Meeting> meetingListResult = this._getUserMeetingList(pAuthentication);
        LOGGER.info("_getUserMeetingList - END - Meeting List: " + meetingListResult);
		return new ApiResponse<List<Meeting>>(meetingListResult, KrakenConstants.CODE_OK, "");
		
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> createMeeting(OAuth2Authentication pAuthentication, Meeting pMeeting) throws DAOException {
        LOGGER.info("createMeeting - INI - Authentication: " + pAuthentication + " - Meeting: " + pMeeting);
		Attendant authedUser = userService.getUserById(((CustomUserDetails) pAuthentication.getPrincipal()).getId());
		pMeeting.setOrganiser(authedUser);
		List<Meeting> meetingListResult = meetingDAO.persistMeeting(pMeeting, authedUser.getId());
		LOGGER.info("createMeeting - END - Meeting List: " + meetingListResult);
		return new ApiResponse<List<Meeting>>(meetingListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> editMeeting(OAuth2Authentication pAuthentication, Meeting pMeeting) throws DAOException {
        LOGGER.info("editMeeting - INI - Authentication: " + pAuthentication + " - Meeting: " + pMeeting);
		Meeting meetingToSave = this._getMeetingById(pMeeting.getId());
		
		if (meetingToSave == null) {
			LOGGER.error("editMeeting - ERR - Meeting not found");
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
		
		List<Meeting> meetingListResult = meetingDAO.persistMeeting(meetingToSave, authedUserId);
		
		LOGGER.info("editMeeting - END - Meeting List: " + meetingListResult);
		return new ApiResponse<List<Meeting>>(meetingListResult, KrakenConstants.CODE_OK, "");
		
	}
	
	@Transactional
	public ApiResponse<List<Meeting>> deleteMeeting(OAuth2Authentication pAuthentication, int pMeetingId) throws DAOException {
        LOGGER.info("deleteMeeting - INI - Authentication: " + pAuthentication + " - Meeting id: " + pMeetingId);
		Meeting meetingToSave = this._getMeetingById(pMeetingId);
			
		if (meetingToSave == null) {
	        LOGGER.error("deleteMeeting - ERR - Meeting not found");
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, "Meeting not found");
		}
		
		int authedUserId = ((CustomUserDetails) pAuthentication.getPrincipal()).getId();
		if (meetingToSave.getOrganiser().getId() != authedUserId) {
	        LOGGER.error("deleteMeeting - ERR - No permissions to delete this meeting");
			return new ApiResponse<List<Meeting>>(null, KrakenConstants.CODE_NOK, "No permissions to delete this meeting");
		}
		
		List<Meeting> meetingListResult = meetingDAO.deleteMeeting(pMeetingId, authedUserId);
		
		LOGGER.info("deleteMeeting - END - Meeting List: " + meetingListResult);
		return new ApiResponse<List<Meeting>>(meetingListResult, KrakenConstants.CODE_OK, "");
	}
	
	@Transactional
	private Meeting _getMeetingById(int pId) throws DAOException {
		return meetingDAO.getMeetingById(pId);
	}

}
