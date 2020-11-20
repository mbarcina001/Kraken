package io.mbarcina.kraken.api.repository.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IMeetingDAO;
import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.repository.IMeetingService;

@Repository
public class MeetingServiceImpl implements IMeetingService{
	
	@Autowired
	private IMeetingDAO meetingDAO;
	
	@Transactional
	public List<Meeting> getUserMeetingList(int userId){
		return meetingDAO.getUserMeetingList(userId);
	}

}
