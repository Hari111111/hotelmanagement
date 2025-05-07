-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2025 at 04:07 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `roomId` int(11) NOT NULL,
  `checkIn` date DEFAULT NULL,
  `checkOut` date DEFAULT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'confirmed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `userId`, `roomId`, `checkIn`, `checkOut`, `status`) VALUES
(1, 1, 3, '2025-05-04', '2025-06-04', 'cancelled'),
(2, 1, 3, '2025-08-04', '2025-09-04', 'confirmed');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `location` varchar(250) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `location`, `rating`, `images`) VALUES
(2, 'testing', 'delhi', 2.2, NULL),
(4, 'tajhotel', 'lucknow', 4, '[null,null]'),
(5, 'tajhotel', 'lucknow', 4, '[null,null]'),
(6, 'testing3', 'noida', 5, '[\"images-1746192596378-696559969.jpg\",\"images-1746192596472-394105365.jpg\"]'),
(7, 'tajhotel', 'lucknow', 4, '[\"images-1746192825937-807287210.jpg\",\"images-1746192826123-474937020.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `hotelId` int(11) NOT NULL,
  `number` varchar(200) NOT NULL,
  `price` float DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `hotelId`, `number`, `price`, `type`, `images`, `available`) VALUES
(1, 6, '203', 1900, 'Hight', '', 0),
(3, 2, '500', 1800.5, 'medium', '', 1),
(5, 6, '301', 800, 'high', '[\"images-1746193178484-594984656.jpg\",\"images-1746193178533-477992724.jpg\"]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userName`, `email`, `password`, `role`) VALUES
(1, 'Hari Mishra', 'harimishra922@gmail.com', '$2b$10$a1XFXQHT99.gakoMMdZ1QuwK5fS92wWFtXx1qwUncQlOUHlBN3LZu', 'admin'),
(4, 'hari', 'harimishra222@gmail.com', '$2b$10$54RAL6qxOoCF7bC5ni5l9OP9LwxO5/6xQoMRvnb4jT1qTkXGt02nG', 'user'),
(5, 'admin', 'admin@gmail.com', '$2b$10$Epe0CDg7nqinL7poHrUiN.QqlGBznRpEWTBDWpEoPxOqKV..LqDE2', 'admin'),
(6, 'admin', 'admin3@gmail.com', '$2b$10$0zU11h21zWufiedVPwWnJOzp77dUawAEAff8ql72wNNTTgahpqVEy', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
