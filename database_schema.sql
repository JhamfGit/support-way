-- =============================================
-- Database Schema for Support Way
-- Target: MySQL / MariaDB
-- Version: 1.0
-- Author: Antigravity AI
-- Description: Script to create the database and tables 
--              for support management tracking.
-- =============================================

CREATE DATABASE IF NOT EXISTS support_way_db;
USE support_way_db;

-- 1. Table: technicians (Optional, for better data normalization)
CREATE TABLE IF NOT EXISTS technicians (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table: clients (Optional, for better data normalization)
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    address TEXT,
    contact_person VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: supports (Main tracking table)
CREATE TABLE IF NOT EXISTS supports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    technician_name VARCHAR(100) NOT NULL, -- Storing name directly as per current App state
    client_name VARCHAR(150) NOT NULL,     -- Storing name directly as per current App state
    support_type ENUM('Instalación', 'Mantenimiento', 'Reparación', 'Consultoría', 'Emergencia') NOT NULL,
    status ENUM('assigned', 'traveling', 'arrive_site', 'started', 'completed') DEFAULT 'assigned',
    transport_mode ENUM('Caminando', 'Moto', 'Carro', 'Transporte Público') NULL,
    
    -- Schedule
    scheduled_time TIME NULL,
    
    -- Timestamps for lifecycle tracking
    assigned_at DATETIME NOT NULL,
    travel_start_at DATETIME NULL,
    travel_end_at DATETIME NULL,
    support_start_at DATETIME NULL,
    support_end_at DATETIME NULL,
    
    -- Metrics (Calculated durations in minutes)
    travel_duration_mins INT DEFAULT 0,
    support_duration_mins INT DEFAULT 0,
    total_duration_mins INT DEFAULT 0,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_status (status),
    INDEX idx_technician (technician_name),
    INDEX idx_assigned_date (assigned_at)
);

-- 4. Sample Views for Reports (Admin Dashboard)
CREATE VIEW view_daily_supports_summary AS
SELECT 
    DATE(assigned_at) as support_date,
    COUNT(*) as total_supports,
    SUM(total_duration_mins) as total_mins_worked,
    AVG(total_duration_mins) as avg_support_time
FROM supports
GROUP BY DATE(assigned_at);

CREATE VIEW view_technician_performance AS
SELECT 
    technician_name,
    COUNT(*) as total_completed,
    AVG(travel_duration_mins) as avg_travel_time,
    AVG(support_duration_mins) as avg_active_support_time,
    SUM(total_duration_mins) as cumulative_time_mins
FROM supports
WHERE status = 'completed'
GROUP BY technician_name;
