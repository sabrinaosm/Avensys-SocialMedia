package com.socialmediaweb.socialmediaweb.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.repository.UserRepository;

@Service
public class AuthenticationService {
	@Autowired
	private UserRepository repository;
	
	public Users saveUser(Users users) {
		return repository.save(users);
	}
	
	public List<Users> SaveUsers(List<Users> users) {
		return repository.saveAll(users);
	}
	
	public List<Users> getUsers(){
		return repository.findAll();
	}
	
	public Users getUsersById(int id) { 
		return repository.findById(id).orElse(null);
	}
	
//	public Users getUsersByUsername(String username) { 
//		return repository.findByName(username);
//	}
	
}
