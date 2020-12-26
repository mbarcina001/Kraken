package io.mbarcina.kraken.api.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import io.mbarcina.kraken.auth.entity.Role;

@Entity
@Table(name="user")
public class Attendant {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@NotNull
	@NotBlank
	@Column(name="name")
	private String username;
	
	@NotNull
	@NotBlank
	@Column(name="password")
    private String password;
	
	@NotNull
	@NotBlank
	@Column(name="email")
    private String email;
	
	@ManyToMany(fetch=FetchType.LAZY, cascade={CascadeType.MERGE })
	@JoinTable(
		name = "user_role",
		joinColumns = @JoinColumn(name="user_id"),
		inverseJoinColumns = @JoinColumn(name="role_id")
	)
	private List<Role> roles = new ArrayList<Role>();
	
	@JsonIgnore
	@ManyToMany(fetch=FetchType.LAZY, cascade={CascadeType.MERGE })
	@JoinTable(
		name = "meeting_attendant",
		joinColumns = @JoinColumn(name="user_id", referencedColumnName="id"),
		inverseJoinColumns = @JoinColumn(name="meeting_id", referencedColumnName="id")
	)
	private List<Meeting> meetings = new ArrayList<Meeting>();
    
	public int getId() {
		return id;
	}

	public void setUserId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> userAuthorities) {
		this.roles = userAuthorities;
	}

	public List<Meeting> getMeetings() {
		return meetings;
	}

	public void setMeetings(List<Meeting> meetings) {
		this.meetings = meetings;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", email=" + email + ", roles="
				+ roles + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + id;
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((roles == null) ? 0 : roles.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Attendant other = (Attendant) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (id != other.id)
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (roles == null) {
			if (other.roles != null)
				return false;
		} else if (!roles.equals(other.roles))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}
	
	public Attendant() {  }

	public Attendant(int id, @NotBlank String username, @NotBlank String password, @NotBlank String email,
			List<Role> roles) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.roles = roles;
	}

	public void addRole(Role pRole) {
		this.roles.add(pRole);
	}

	public void addMeeting(Meeting pMeeting) {
		this.meetings.add(pMeeting);
	}
}
