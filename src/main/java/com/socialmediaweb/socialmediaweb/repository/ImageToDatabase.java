package com.socialmediaweb.socialmediaweb.repository;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ImageToDatabase {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/socialmedia_db"; // Replace "db_name" with your database name
        String username = "root"; // Replace with your MySQL username
        String password = "4GgcT6>bUoo>"; // Replace with your MySQL password

        String imagePath = "/socialmedia-web/src/main/resources/profilePics"; // Replace with the path to your image file

        try (Connection conn = DriverManager.getConnection(url, username, password)) {
            File imageFile = new File(imagePath);
            FileInputStream fis = new FileInputStream(imageFile);

            String sql = "INSERT INTO images (image_data) VALUES (?)";
            PreparedStatement statement = conn.prepareStatement(sql);
            statement.setBinaryStream(1, fis, (int) imageFile.length());
            statement.executeUpdate();

            System.out.println("Image stored in the database successfully.");
        } catch (SQLException | IOException e) {
            e.printStackTrace();
        }
    }
}