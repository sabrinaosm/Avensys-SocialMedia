package com.socialmediaweb.socialmediaweb.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialmediaweb.socialmediaweb.entities.Users;

public interface UserRepository extends JpaRepository<Users,Integer>{
    Optional<Users> findByName(String username);
	
}
