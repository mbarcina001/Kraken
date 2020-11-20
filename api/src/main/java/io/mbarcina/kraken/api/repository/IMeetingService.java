package io.mbarcina.kraken.api.repository;

import java.util.List;

import io.mbarcina.kraken.api.entity.Meeting;

public interface IMeetingService {
	
	public List<Meeting> getUserMeetingList(int userId);

}
