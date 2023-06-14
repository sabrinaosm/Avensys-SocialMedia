package com.socialmediaweb.socialmediaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.service.AuthenticationService;

@RestController
public class UserController {
	@Autowired
	AuthenticationService service;
	
	@PostMapping("/createuser")
	public Users createUser(@RequestBody Users user) {
		return service.saveUser(user);
	}
	
	@PostMapping("/createusers")
	public List<Users> createUsers(@RequestBody List<Users> users) {
		return service.saveUsers(users);
	}
	
	@GetMapping("/users")
	public List<Users> getUsers() {
		return service.getUsers();
	}
	
	@GetMapping("/user/{user_id}")
	public Users findUserById(@PathVariable("user_id") Integer user_id) {
		return service.getUsersById(user_id);
	}
	
	@PutMapping("/updateuser")
	public Users updateUser(@RequestBody Users user) {
		return service.updateUser(user);
	}
	
	@DeleteMapping("/deleteuser/{user_id}")
	public String deleteUser(@PathVariable("user_id") Integer user_id) {
		return service.deleteUser(user_id);
	}
	
	@PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("username") String username, @RequestParam("password") String password) {
        boolean isAuthenticated = service.authenticateUser(username, password);
        if (isAuthenticated) {
            return ResponseEntity.ok("Correct user details!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password. Please try again.");    
        }
    }
	
	
	
}
