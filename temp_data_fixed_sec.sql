-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               9.3.0-commercial - MySQL Enterprise Server - Commercial
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for datos_de_usuario
CREATE DATABASE IF NOT EXISTS `datos_de_usuario` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `datos_de_usuario`;

-- Dumping structure for table datos_de_usuario.drivers
CREATE TABLE IF NOT EXISTS `drivers` (
  `user_id` int NOT NULL,
  `vehicle_license` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  KEY `FK_drivers_users` (`user_id`) USING BTREE,
  CONSTRAINT `FK_drivers_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datos_de_usuario.drivers: ~0 rows (approximately)

-- Dumping structure for table datos_de_usuario.trips
CREATE TABLE IF NOT EXISTS `trips` (
  `trip_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `driver_id` int NOT NULL DEFAULT (0),
  `available_spaces` int NOT NULL,
  `passenger_id_1` int DEFAULT NULL,
  `passenger_id_2` int DEFAULT NULL,
  `passenger_id_3` int DEFAULT NULL,
  `passenger_id_4` int DEFAULT NULL,
  `registry_date` datetime NOT NULL,
  `starting_time` datetime NOT NULL,
  `finishing_time` datetime NOT NULL,
  `trip_origin` varchar(100) NOT NULL,
  `trip_route` varchar(100) NOT NULL,
  `note_insight` longtext,
  UNIQUE KEY `trip_id` (`trip_id`(150)) USING BTREE,
  KEY `driver_id` (`driver_id`),
  KEY `available_spaces` (`available_spaces`,`passenger_id_1`,`passenger_id_2`,`passenger_id_3`,`passenger_id_4`),
  CONSTRAINT `FKT_trips_users` FOREIGN KEY (`driver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datos_de_usuario.trips: ~0 rows (approximately)

-- Dumping structure for table datos_de_usuario.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL DEFAULT '0',
  `full_name` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `gender` binary(1) DEFAULT NULL,
  `cell_number` int NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `cell_number` (`cell_number`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table datos_de_usuario.users: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
