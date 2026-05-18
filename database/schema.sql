-- Database: timer_ps
CREATE DATABASE IF NOT EXISTS timer_ps CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE timer_ps;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Active timers table
CREATE TABLE IF NOT EXISTS active_timers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  total_time INT NOT NULL COMMENT 'Total seconds',
  remaining_time INT NOT NULL COMMENT 'Remaining seconds',
  is_paused BOOLEAN DEFAULT FALSE,
  is_finished BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_is_finished (is_finished)
);

-- Saved timers table
CREATE TABLE IF NOT EXISTS saved_timers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  total_time INT NOT NULL COMMENT 'Total seconds',
  remaining_time INT NOT NULL COMMENT 'Remaining seconds',
  is_paused BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Presets table
CREATE TABLE IF NOT EXISTS presets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  hours INT NOT NULL DEFAULT 0,
  minutes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- History table
CREATE TABLE IF NOT EXISTS history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  total_time INT NOT NULL COMMENT 'Total seconds',
  remaining_time INT NOT NULL COMMENT 'Remaining seconds when finished',
  payment INT DEFAULT 0 COMMENT 'Payment in Rupiah',
  status ENUM('completed', 'cancelled') NOT NULL,
  completed_at TIMESTAMP NULL,
  cancelled_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_completed_at (completed_at)
);

-- Insert default admin user (password: 12345)
-- In production, use proper password hashing (bcrypt)
INSERT INTO users (username, password_hash) VALUES
('admin', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ')
ON DUPLICATE KEY UPDATE username = username;
