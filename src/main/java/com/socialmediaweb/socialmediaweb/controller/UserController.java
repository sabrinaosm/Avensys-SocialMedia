package com.socialmediaweb.socialmediaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.service.AuthenticationService;

@RestController
public class UserController {
	@Autowired
	AuthenticationService service;

	@GetMapping("/users")
	public List<Users> getUsers() {
		return service.getUsers();
	}
	
	
	
	@PostMapping("/addUser")
	public Users addUser(@RequestBody Users users) {
		return service.saveUser(users);
	}
	
	

}
