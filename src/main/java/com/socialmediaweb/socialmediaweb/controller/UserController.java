package com.socialmediaweb.socialmediaweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.repository.UserRepository;

@RestController
public class UserController {
	@Autowired
	UserRepository repository;
	
	@PostMapping("/addUser")
	public Users addUser(@RequestBody Users entity) {
		return repository.save(entity);
	}
	
	

}
