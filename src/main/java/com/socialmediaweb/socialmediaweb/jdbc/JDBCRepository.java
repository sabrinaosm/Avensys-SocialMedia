package com.socialmediaweb.socialmediaweb.jdbc;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.socialmediaweb.socialmediaweb.entities.Users;

@Repository
public class JDBCRepository {
	@Autowired
	private JdbcTemplate springJdbcTemplate;
	
	private static String INSERT_QUERY = 
			"""
				INSERT INTO Users (user_id, first_name, last_name, username, email, gender, password, created_on)
				VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
			""";
	
	private static String DELETE_QUERY = 
			"""
				DELETE FROM Users WHERE user_id =  ?
			""";
	
	private static String SELECT_QUERY = 
			"""
				SELECT FROM Users WHERE user_id =  ?
			""";
	

	public void insert(Users user) {
		springJdbcTemplate.update(INSERT_QUERY, user.getUser_id(), user.getFirst_name(), user.getLast_name(), user.getUsername(), user.getEmail(), user.getPassword(), user.getGender(), LocalDate.now());
	}
	
	public void deleteById(long user_id) {
		springJdbcTemplate.update(DELETE_QUERY, user_id);
	}
	
    public Users findById(long user_id) {
        return springJdbcTemplate.queryForObject(SELECT_QUERY, new BeanPropertyRowMapper<>(Users.class), user_id);
    }
}
