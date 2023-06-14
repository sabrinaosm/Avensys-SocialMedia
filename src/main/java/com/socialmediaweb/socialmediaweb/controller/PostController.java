package com.socialmediaweb.socialmediaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.socialmediaweb.socialmediaweb.entities.Post;
import com.socialmediaweb.socialmediaweb.service.PostService;

@Controller
public class PostController {
	@Autowired
	private PostService service;
	
	
	@PostMapping("/createPost")
	public Post createPost(@RequestBody Post post) {
		return service.createPost(post);
	}
	
	@PostMapping("/createPosts")
	public List<Post> savePosts(@RequestBody List<Post> posts) {
		return service.createPosts(posts);
	}
	
	@GetMapping("/feed")
	public List<Post> getPosts() {
		return service.getPosts();
	}
	
	@GetMapping("/post/{id}")
	public Post getPostById(int post_id) {
		return service.getPostById(post_id);
	}
	
	@PutMapping("/update")
	public Post updatePost(@RequestBody Post post) {
		return service.updatePost(post);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deletePost(int post_id) {
		return service.deletePost(post_id);
	}
	

}
