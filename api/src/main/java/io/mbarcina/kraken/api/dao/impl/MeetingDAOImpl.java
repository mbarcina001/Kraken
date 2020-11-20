package io.mbarcina.kraken.api.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IMeetingDAO;
import io.mbarcina.kraken.api.entity.Meeting;

@Repository
public class MeetingDAOImpl implements IMeetingDAO{
	
	@Autowired
	private EntityManager entityManager;
	
	@Transactional
	public List<Meeting> getUserMeetingList(int pUserId) {		
		// Create a query
		TypedQuery<Meeting> theQuery = entityManager.createQuery("SELECT m FROM Meeting m JOIN m.attendantList a WHERE (a.id = " + pUserId + " OR m.organiser.id = " + pUserId + ") GROUP BY m.id", Meeting.class);
		
		// Get the result list
		List<Meeting> meetings = theQuery.getResultList();
		
		return meetings;
	}
}
