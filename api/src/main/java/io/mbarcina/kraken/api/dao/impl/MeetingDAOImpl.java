package io.mbarcina.kraken.api.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import io.mbarcina.kraken.api.dao.IMeetingDAO;
import io.mbarcina.kraken.api.entity.Meeting;
import io.mbarcina.kraken.api.exception.DAOException;

@Repository
public class MeetingDAOImpl implements IMeetingDAO{
	
	@Autowired
	private EntityManager entityManager;
	
    private static final Logger LOGGER = LoggerFactory.getLogger(MeetingDAOImpl.class);

	@Transactional
	public Meeting getMeetingById(int pId) throws DAOException {
		try {
		// Create a query		
		TypedQuery<Meeting> theQuery = entityManager.createQuery("from Meeting WHERE id=" + pId, Meeting.class);

		// Get the result list
		Meeting meeting = theQuery.getSingleResult();

		return meeting;
		} catch (Exception e) {
			LOGGER.error("getMeetingById - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error retrieving meeting with id " + pId + ": " +  e.getMessage());
		}
		
	}
	
	@Transactional
	public List<Meeting> getUserMeetingList(int pUserId) throws DAOException {
		try {TypedQuery<Meeting> theQuery = entityManager.createQuery("SELECT m FROM Meeting m JOIN m.attendantList a WHERE (a.id = " + pUserId + " OR m.organiser.id = " + pUserId + ") GROUP BY m.id", Meeting.class);
			return theQuery.getResultList();
		} catch (Exception e) {
			LOGGER.error("getUserMeetingList - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error retrieving meetings: " + e.getMessage());
		}
	}
	
	@Transactional
	public List<Meeting> persistMeeting(Meeting pMeeting, int pUserId) throws DAOException {
		try {
			entityManager.persist(pMeeting);
			return this.getUserMeetingList(pUserId);
		} catch (Exception e) {
			LOGGER.error("persistMeeting - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error saving meeting: " + e.getMessage());
		}
	}
	
	@Transactional
	public List<Meeting> deleteMeeting(int pMeetingId, int pUserId) throws DAOException {
		try {
			entityManager.createQuery("DELETE FROM Meeting where id=" + pMeetingId).executeUpdate();
			return this.getUserMeetingList(pUserId);
		} catch (Exception e) {
			LOGGER.error("deleteMeeting - ERR - DAOException: " + e.getMessage());
			LOGGER.error(e.getStackTrace().toString());
			throw new DAOException("Error deleting meeting: " + e.getMessage());
		}
	}
}
