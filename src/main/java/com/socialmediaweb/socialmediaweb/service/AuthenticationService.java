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
	
	public Users saveUser(Users user) {
        return repository.save(user);
    }

	//save all posts
	public List<Users> saveUsers(List<Users> users) {
		return repository.saveAll(users);
	}
	//get all users
	public List<Users> getUsers(){
		return repository.findAll();
	}
	//get user by id
	public Users getUsersById(int id) { 
		return repository.findById(id).orElse(null);
	}
	//get user by username
	public Users getUsersByName(String username) {
		return repository.findByName(username).orElse(null);
	}
	
	//delete
	public String deleteUser(int id) {
		repository.deleteById(id);
		return "User deleted.";
	}
	
	//update users
	public Users updateUser(Users user) {
		Users existingUser = repository.findById(user.getUser_id()).orElse(null);
		existingUser.setUsername(user.getUsername());
		existingUser.setFirst_name(user.getFirst_name());
		existingUser.setLast_name(user.getLast_name());
		existingUser.setEmail(user.getEmail());
		existingUser.setPassword(user.getPassword());
		existingUser.setGender(user.getGender());
		existingUser.setProfile_picture(user.getProfile_picture());
		return repository.save(existingUser);
		
	}

	
}
