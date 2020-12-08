package io.mbarcina.kraken.api.dao;

import java.util.List;

import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.exception.DAOException;

public interface IMeetingDAO {
	
	public List<Meeting> getUserMeetingList(int pUserId) throws DAOException;
	public List<Meeting> persistMeeting(Meeting pMeeting, int pUserId) throws DAOException;
	public List<Meeting> deleteMeeting(Meeting pMeeting, int pUserId) throws DAOException;
	
}