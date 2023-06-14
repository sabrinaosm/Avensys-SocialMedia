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
	
	public Post createPost(Post post) {
		return repository.save(post);
	}
	
	public List<Post> createPosts(List<Post> posts) {
		return repository.saveAll(posts);
	}
	
	public List<Post> getPosts() {
		return repository.findAll();
	}
	
	public Post getPostById(int post_id) {
		return repository.findById(post_id).orElse(null);
	}
	
	public String deletePost(int post_id) {
		repository.deleteById(post_id);
		return "Deleted.";
	}
	
	public Post updatePost(Post post) {
		Post existingPost = repository.findById(post.getPost_id()).orElse(post);
		existingPost.setContent(post.getContent());
		existingPost.setImage(post.getImage());
		return repository.save(existingPost);
	}
}
