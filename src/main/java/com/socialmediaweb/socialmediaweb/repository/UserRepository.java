package com.socialmediaweb.socialmediaweb.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.socialmediaweb.socialmediaweb.entities.Users;

public interface UserRepository extends JpaRepository<Users, Long>{


public interface UserRepository extends JpaRepository<Users, Integer>{
	
	
}
