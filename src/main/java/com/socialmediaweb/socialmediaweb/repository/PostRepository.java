package com.socialmediaweb.socialmediaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.socialmediaweb.socialmediaweb.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer>{

}