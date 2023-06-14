package com.socialmediaweb.socialmediaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.socialmediaweb.socialmediaweb.entities.Post;

public interface PostRepository extends JpaRepository<Post, Integer>{

}
