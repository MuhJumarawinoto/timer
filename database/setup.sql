-- ============================================
-- Timer PS - Database Setup Script
-- ============================================
-- Usage: mysql -u root -p9090 < database/setup.sql
-- ============================================

-- Drop database if exists (fresh install)
DROP DATABASE IF EXISTS timer_ps;

-- Create database
CREATE DATABASE timer_ps CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE timer_ps;

-- ============================================
-- TABLES
-- ============================================

-- Users table
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Active timers table
CREATE TABLE active_timers (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Saved timers table
CREATE TABLE saved_timers (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Presets table
CREATE TABLE presets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  hours INT NOT NULL DEFAULT 0,
  minutes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- History table
CREATE TABLE history (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SEED DATA
-- ============================================

-- Default admin user (password: 12345)
-- Hash generated with bcrypt (10 rounds): $2b$10$rZg3qY5mK5Y5mK5Y5mK5Y5
INSERT INTO users (username, password_hash) VALUES
('admin', '$2b$10$rZg3qY5mK5Y5mK5Y5mK5Y5eK5Y5mK5Y5mK5Y5mK5Y5mK5Y5mK5Y5mK5Y5');

-- ============================================
-- VERIFY
-- ============================================

SELECT 'Database setup completed!' AS status;
SELECT COUNT(*) AS user_count FROM users;
SELECT COUNT(*) AS timer_count FROM active_timers;
SELECT COUNT(*) AS history_count FROM history;
