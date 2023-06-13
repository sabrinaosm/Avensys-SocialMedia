package com.socialmediaweb.socialmediaweb.jdbc;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.socialmediaweb.socialmediaweb.entities.Users;

@Component
public class CommandLine implements CommandLineRunner{
	@Autowired
	private JDBCRepository repository;
	
	@Autowired
	public CommandLine(JDBCRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public void run(String... args) throws Exception {
		repository.insert(new Users(1, "Jane", "Doe", "janedoe", "janedoe@mail.com", "Female", "password", LocalDate.now()));
		repository.insert(new Users(2, "Joe", "Doe", "joedoe", "joedoe@mail.com", "Male", "password", LocalDate.now()));
	}
}
