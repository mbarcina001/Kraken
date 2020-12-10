package io.mbarcina.kraken.api.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IMeetingDAO;
import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.exception.DAOException;

@Repository
public class MeetingDAOImpl implements IMeetingDAO{
	
	@Autowired
	private EntityManager entityManager;

	@Transactional
	public Meeting getMeetingById(int pId) throws DAOException {
		// Create a query
		TypedQuery<Meeting> theQuery = entityManager.createQuery("from Meeting WHERE id=" + pId, Meeting.class);

		// Get the result list
		Meeting meeting = theQuery.getSingleResult();

		return meeting;
	}
	
	@Transactional
	public List<Meeting> getUserMeetingList(int pUserId) throws DAOException {
		try {
			// Create a query
			TypedQuery<Meeting> theQuery = entityManager.createQuery("SELECT m FROM Meeting m JOIN m.attendantList a WHERE (a.id = " + pUserId + " OR m.organiser.id = " + pUserId + ") GROUP BY m.id", Meeting.class);
			
			// Get the result list
			List<Meeting> meetings = theQuery.getResultList();
			
			return meetings;
		} catch (Exception e) {
			throw new DAOException("Error retrieving meetings");
		}
	}
	
	@Transactional
	public List<Meeting> persistMeeting(Meeting pMeeting, int pUserId) throws DAOException {
		try {
			entityManager.persist(pMeeting);
			return this.getUserMeetingList(pUserId);
		} catch (Exception e) {
			throw new DAOException("Error retrieving meetings");
		}
	}
	
	@Transactional
	public List<Meeting> deleteMeeting(Meeting pMeeting, int pUserId) throws DAOException {
		try {
			entityManager.createQuery("DELETE FROM Meeting where id=" + pMeeting.getId()).executeUpdate();
			return this.getUserMeetingList(pUserId);
		} catch (Exception e) {
			throw new DAOException("Error retrieving meetings");
		}
	}
}
