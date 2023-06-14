package com.socialmediaweb.socialmediaweb.entities;

import java.net.URL;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
@Table(name = "USERS_TBL")


public class Users{
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "first_name")
	private String first_name;
	
	@Column(name = "last_name")
	private String last_name;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "profile_picture")
	private URL profile_picture;
	
	@Column(name = "created_on")
	private Date created_on;
	
		
	}