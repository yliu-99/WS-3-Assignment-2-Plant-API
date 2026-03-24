-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 24, 2026 at 01:41 AM
-- Server version: 8.0.44
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `yuhans_plant_shelf`
--

-- --------------------------------------------------------

--
-- Table structure for table `plants`
--

CREATE TABLE `plants` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `species` varchar(100) NOT NULL,
  `size` enum('x-small','small','medium','large','x-large') NOT NULL,
  `date_bought` date NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `type_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `plants`
--

INSERT INTO `plants` (`id`, `name`, `species`, `size`, `date_bought`, `image`, `type_id`) VALUES
(1, 'Jerry', 'Snake Plant', 'large', '2021-01-13', 'jerry.jpeg', 1),
(2, 'Celine', 'Peace Lily', 'medium', '2024-04-23', 'celine.jpeg', 2),
(3, 'Goku', 'Maidenhair Fern', 'small', '2022-07-09', 'goku.jpeg', 3),
(4, 'Cashmoney', 'Money Tree', 'large', '2024-09-18', 'cashmoney.jpeg', 2),
(5, 'Jessica', 'Jade Plant', 'medium', '2026-03-23', '1774303343350-jessica.jpeg', 1),
(7, 'Baby', 'Mini Roser', 'small', '2026-03-23', '1774305076336-baby.jpeg', 4),
(8, 'Medusa', 'Air Plant', 'x-small', '2026-03-23', '1774304975507-medusa.jpeg', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `plants`
--
ALTER TABLE `plants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `plants`
--
ALTER TABLE `plants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `plants`
--
ALTER TABLE `plants`
  ADD CONSTRAINT `plants_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `plant_types` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
