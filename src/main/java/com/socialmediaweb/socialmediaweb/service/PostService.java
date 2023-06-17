package com.socialmediaweb.socialmediaweb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.socialmediaweb.socialmediaweb.entities.Post;
import com.socialmediaweb.socialmediaweb.repository.PostRepository;

@Service
public class PostService {
	@Autowired
	private PostRepository repository;
	
	// Create a new post
	public Post savePost(Post post) {
		return repository.save(post);
	}
	
	// Save all posts
	public List<Post> savePosts(List<Post> posts) {
		return repository.saveAll(posts);
	}
	
	// Get all posts
	public List<Post> getPosts() {
		return repository.findAll();
	}
	
	// Get Post by Id
	public Post getPostById(int post_id) {
		return repository.findById(post_id).orElse(null);
	}
	
	// Delete Post
	public String deletePost(int post_id) {
		repository.deleteById(post_id);
		return "Post deleted.";
	}
	
	// Update Post
	public Post updatePost(Post post) {
		Post existingPost = repository.findById(post.getPost_id()).orElse(null);
		existingPost.setContent(post.getContent());
		existingPost.setMedia(post.getMedia());
		return repository.save(existingPost);
	}
}