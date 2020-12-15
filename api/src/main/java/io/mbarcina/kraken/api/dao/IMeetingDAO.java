package io.mbarcina.kraken.api.dao;

import java.util.List;

import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.exception.DAOException;

public interface IMeetingDAO {
	
	public Meeting getMeetingById(int pMeetingId) throws DAOException;
	public List<Meeting> getUserMeetingList(int pUserId) throws DAOException;
	public List<Meeting> persistMeeting(Meeting pMeeting, int pUserId) throws DAOException;
	public List<Meeting> deleteMeeting(int pMeetingId, int pUserId) throws DAOException;
	
}