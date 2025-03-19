 -- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: Student Platform
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NO…
[11:29 pm, 19/3/2025] Koka Sai Abhishek NITC CSE: -- Create database
CREATE DATABASE IF NOT EXISTS student_platform;
USE student_platform;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firebase_uid VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  photo_url TEXT,
  created_at DATETIME NOT NULL,
  last_login DATETIME NOT NULL,
  role ENUM('student', 'admin', 'faculty') DEFAULT 'student',
  INDEX idx_firebase_uid (firebase_uid),
  INDEX idx_email (email)
);

-- Student profiles
CREATE TABLE IF NOT EXISTS student_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  department VARCHAR(100),
  batch_year INT,
  registration_number VARCHAR(50),
  phone_number VARCHAR(20),
  address TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Placements
CREATE TABLE IF NOT EXISTS placements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  package DECIMAL(10, 2),
  offer_date DATE,
  joining_date DATE,
  status ENUM('offered', 'accepted', 'rejected', 'joined') DEFAULT 'offered',
  FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
);

-- Events
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_type ENUM('workshop', 'seminar', 'fest', 'recruitment', 'other') NOT NULL,
  start_date DATETIME NOT NULL,
  end_date DATETIME NOT NULL,
  location VARCHAR(255),
  organizer VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Event participation
CREATE TABLE IF NOT EXISTS event_participants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  student_id INT NOT NULL,
  registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  attended BOOLEAN DEFAULT FALSE,
  feedback TEXT,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
  UNIQUE KEY unique_participation (event_id, student_id)
);

-- Administration reports
CREATE TABLE IF NOT EXISTS admin_reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  report_type VARCHAR(100) NOT NULL,
  created_by INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  report_data JSON,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Saved queries
CREATE TABLE IF NOT EXISTS saved_queries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  query_text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_executed DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Query results
CREATE TABLE IF NOT EXISTS query_results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  query_id INT NOT NULL,
  result_data JSON,
  execution_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (query_id) REFERENCES saved_queries(id) ON DELETE CASCADE
);

-- Sample data for users
INSERT INTO users (firebase_uid, name, email, password, photo_url, created_at, last_login, role)
VALUES 
('sample1', 'Admin User', 'admin@example.com', 'admin123', 'https://randomuser.me/api/portraits/men/1.jpg', NOW(), NOW(), 'admin'),
('sample2', 'Faculty User', 'faculty@example.com', 'faculty123', 'https://randomuser.me/api/portraits/women/1.jpg', NOW(), NOW(), 'faculty'),
('sample3', 'Student One', 'student1@example.com', 'student123', 'https://randomuser.me/api/portraits/men/2.jpg', NOW(), NOW(), 'student'),
('sample4', 'Student Two', 'student2@example.com', 'student123', 'https://randomuser.me/api/portraits/women/2.jpg', NOW(), NOW(), 'student');

-- Sample data for student profiles
CREATE TABLE IF NOT EXISTS student_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  department VARCHAR(100),
  batch_year INT,
  registration_number VARCHAR(50),
  phone_number VARCHAR(20),
  address TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sample placement data
INSERT INTO placements (student_id, company_name, position, package, offer_date, joining_date, status)
VALUES 
(1, 'Tech Corp', 'Software Engineer', 1200000.00, '2023-05-15', '2023-07-01', 'joined'),
(1, 'Data Systems', 'Data Analyst', 950000.00, '2023-05-20', NULL, 'rejected'),
(2, 'Global Tech', 'Hardware Engineer', 1100000.00, '2023-05-10', '2023-06-15', 'joined');

-- Sample events
INSERT INTO events (title, description, event_type, start_date, end_date, location, organizer)
VALUES 
('Tech Workshop 2023', 'Learn the latest technologies', 'workshop', '2023-03-10 09:00:00', '2023-03-10 17:00:00', 'Main Auditorium', 'Computer Science Department'),
('Campus Recruitment Drive', 'Multiple companies hiring', 'recruitment', '2023-04-15 10:00:00', '2023-04-17 18:00:00', 'Placement Cell', 'Career Services'),
('Annual Tech Fest', 'Showcase your technical skills', 'fest', '2023-02-25 09:00:00', '2023-02-27 20:00:00', 'College Campus', 'Student Council');

-- Sample event participation
INSERT INTO event_participants (event_id, student_id, registration_date, attended, feedback)
VALUES 
(1, 1, '2023-03-01 10:15:00', TRUE, 'Great workshop, learned a lot!'),
(1, 2, '2023-03-02 14:30:00', TRUE, 'Well organized and informative'),
(2, 1, '2023-04-10 09:45:00', TRUE, 'Got three interview calls'),
(2, 2, '2023-04-10 11:20:00', TRUE, 'Interviewed with two companies'),
(3, 1, '2023-02-20 16:40:00', TRUE, 'Won second prize in coding competition');