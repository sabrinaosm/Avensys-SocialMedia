package com.socialmediaweb.socialmediaweb.entities;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
@Entity
public class Users {
	@Id
	private int user_id;
	private String first_name;
	private String last_name;
	private String username;
	private String email;
	private String password;
	private String gender;
	private LocalDate created_on;
	
	
	
	public Users(int user_id, String first_name, String last_name, String username, String email, String password,
			String gender, LocalDate created_on) {
		super();
		this.user_id = user_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.created_on = created_on;
	}
	
	public Users() {
		
	}
	
	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", first_name=" + first_name + ", last_name=" + last_name + ", username="
				+ username + ", email=" + email + ", password=" + password + ", gender=" + gender + "]";
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public LocalDate getCreated_on() {
		return created_on;
	}
	public void setCreated_on(LocalDate created_on) {
		this.created_on = created_on;
	}
	
	
}
