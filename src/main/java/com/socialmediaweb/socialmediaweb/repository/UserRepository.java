package com.socialmediaweb.socialmediaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.socialmediaweb.socialmediaweb.entities.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer>{

}
