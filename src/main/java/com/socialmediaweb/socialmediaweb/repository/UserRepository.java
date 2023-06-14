package com.socialmediaweb.socialmediaweb.repository;

import com.socialmediaweb.socialmediaweb.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<Users, Integer>{
	
	
}
