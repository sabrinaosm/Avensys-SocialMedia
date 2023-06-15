package com.socialmediaweb.socialmediaweb.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.socialmediaweb.socialmediaweb.entities.Users;

public interface UserRepository extends JpaRepository<Users,Integer>{
	Users findByUsername(String username);
	boolean existsByUsername(String username);
    boolean existsByEmail(String email);
	
}
