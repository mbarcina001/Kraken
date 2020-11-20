package io.mbarcina.kraken.api.dao;

import java.util.List;

import io.mbarcina.kraken.api.entity.Meeting;

public interface IMeetingDAO {
	
	public List<Meeting> getUserMeetingList(int userId);
	
}