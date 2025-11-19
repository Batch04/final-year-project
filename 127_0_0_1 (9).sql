-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2025 at 08:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `partconnectdb`
--
CREATE DATABASE IF NOT EXISTS `partconnectdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `partconnectdb`;

-- --------------------------------------------------------

--
-- Table structure for table `applied_job`
--

CREATE TABLE `applied_job` (
  `applied_jobid` int(11) NOT NULL,
  `seeker_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `provider_name` int(11) NOT NULL,
  `company_name` varchar(30) NOT NULL,
  `applied_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applied_job`
--

INSERT INTO `applied_job` (`applied_jobid`, `seeker_id`, `job_id`, `provider_name`, `company_name`, `applied_date`) VALUES
(41, 18, 22, 23, 'jastechcrop', '2025-10-12'),
(42, 18, 24, 23, 'jastechcrop', '2025-10-12'),
(43, 5, 22, 23, 'jastechcrop', '2025-10-12'),
(44, 5, 24, 23, 'jastechcrop', '2025-10-12'),
(45, 5, 28, 22, 'Jasstech', '2025-10-12'),
(46, 5, 23, 23, 'jastechcrop', '2025-10-12'),
(47, 5, 21, 19, 'starterwave', '2025-10-13'),
(48, 11, 24, 23, 'jastechcrop', '2025-10-18'),
(49, 5, 30, 23, 'jastechcrop', '2025-10-18'),
(50, 11, 21, 19, 'starterwave', '2025-10-18');

-- --------------------------------------------------------

--
-- Table structure for table `hired`
--

CREATE TABLE `hired` (
  `hired_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `seeker_id` int(11) NOT NULL,
  `hired_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hired`
--

INSERT INTO `hired` (`hired_id`, `job_id`, `provider_id`, `seeker_id`, `hired_at`) VALUES
(4, 24, 23, 18, '2025-10-14'),
(6, 24, 23, 11, '2025-10-18'),
(7, 24, 23, 5, '2025-10-18'),
(8, 30, 23, 5, '2025-10-18'),
(12, 28, 22, 5, '2025-11-04');

-- --------------------------------------------------------

--
-- Table structure for table `posted_jobs`
--

CREATE TABLE `posted_jobs` (
  `job_id` int(11) NOT NULL,
  `provider_name` int(11) NOT NULL,
  `job_title` varchar(30) NOT NULL,
  `job_type` varchar(15) NOT NULL,
  `job_location` varchar(30) NOT NULL,
  `job_salary` int(11) NOT NULL,
  `job_salary_time` varchar(14) NOT NULL,
  `job_experience` varchar(30) NOT NULL,
  `job_posted` varchar(20) NOT NULL,
  `job_description` varchar(200) NOT NULL,
  `job_benifits` varchar(200) NOT NULL,
  `job_status` varchar(15) NOT NULL,
  `company_name` varchar(35) NOT NULL,
  `work_load` int(11) NOT NULL,
  `work_period` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posted_jobs`
--

INSERT INTO `posted_jobs` (`job_id`, `provider_name`, `job_title`, `job_type`, `job_location`, `job_salary`, `job_salary_time`, `job_experience`, `job_posted`, `job_description`, `job_benifits`, `job_status`, `company_name`, `work_load`, `work_period`) VALUES
(21, 19, 'team', 'part-time', 'tirupati', 200, 'per-day', 'entry-level', '2025-09-06', 'ths is my discrption', '• Flexible working hours', 'open', 'starterwave', 3, 'per day'),
(22, 23, 'helper', 'part-time', 'Tirupati , Andhrapardesh', 200, 'per-day', 'entry-level', '2025-09-09', 'The maker should know  how to make the french fries and it should be perfect in that field and know how to make other type of snakes item', '• Flexible working hours', 'open', 'jastechcrop', 5, 'per-day'),
(23, 23, 'Teashop', 'part-time', 'Tirupati , Andhrapardesh', 200, 'per-day', 'entry-level', '2025-09-10', 'you should know well how to make tea', '• Free meals and snacks', 'open', 'jastechcrop', 2, 'per-day'),
(24, 23, 'frenchfries ', 'part-time', 'Renigunta', 400, 'per-day', 'entry-level', '2025-09-12', 'The maker should know  how to make the french fries and it should be perfect in that field and know how to make other type of snakes item', '• Free meals and snacks\n• Flexible working hours\n• Health insurance coverage\n• Remote work options', 'open', 'jastechcrop', 3, 'per-day'),
(25, 23, 'waffle maker', 'part-time', 'renigunta', 200, 'per-day', 'entry-level', '2025-09-12', 'The maker should know  how to make the french fries and it should be perfect in that field and know how to make other type of snakes item', '• Free meals and snacks', 'close', 'jastechcrop', 3, 'per-day'),
(26, 19, 'watchman', 'part-time', 'palasa', 100, 'per-day', 'entry-level', '2025-09-13', 'watch man should ne very carefull', '• Free meals and snacks', 'open', 'starterwave', 2, 'per-day'),
(27, 22, 'Fastfood maker', 'part-time', 'srikalasthi', 200, 'per-day', 'entry-level', '2025-09-16', 'the worker should know all type of fastfoods like gobi rice chicken rice and chicken snakes like burger chicken popcorn', '• Flexible working hours\n• Health insurance coverage\n• Free ', 'close', 'Jasstech', 3, 'per-day'),
(28, 22, 'blood collectoe', 'part-time', 'Tirupati', 100, 'per-day', 'entry-level', '2025-09-17', 'asdfghm the worker should know all type of fastfoods like gobi rice chicken rice and chicken snakes like burger chicken popcorn', '• Flexible working hours\n• Health insurance coverage\n• Free meals and snacks\n• Remote work options\n• Professional development opportunities\n• Paid time off\n• Performance bonuses', 'open', 'Jasstech', 4, 'per-day'),
(30, 23, 'teas', 'part-time', 'Tirupati', 233, 'per-day', 'entry-level', '2025-10-13', 'hsfhfcgvrtbjybdn;gcn bfydy', '• Flexible working hours\n• Free meals and snacks', 'open', 'jastechcrop', 2, 'per-day');

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `provider_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(200) NOT NULL,
  `location` varchar(255) NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `company_description` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `providers`
--

INSERT INTO `providers` (`provider_id`, `company_name`, `email`, `password`, `address`, `location`, `contact_number`, `company_description`, `created_at`) VALUES
(1, 'buddy', 'asma@gmal.com', '$2y$10$6SvvzMSNUD.aPgkAjuz/P.GEg127czddQvUKC5K0BGcHL1fUWNf92', '', 'nandyal', '8688543238', '', '2025-08-31 18:31:10'),
(2, 'Nani', 'k2482230@gmail.com', '$2y$10$KHUMaW4i4uav1Sd8lB2rg.SfS2G7jM5zXiYhvdugqC1lojYH6oCdG', '', 'karakambadi', '66304506106', '', '2025-09-01 09:51:39'),
(3, 'Wolswagen', 'mithin1617@gmail.com', '$2y$10$7fAa/OziKnNZONBSjbGAse7fDxzavq2JErDxzG/6ximtgU47tL1q.', '', 'karakambadi', '564234685412', '', '2025-09-01 15:27:58'),
(7, 'T3x', 'vyshnavinarala25@gmail.com', '$2y$10$eAAhsU5tDBBvv7xX9dSH7Of5mCFP6dXdrtg0GYE8HL8fNiTvbpGR2', '', 'tirupati', '8512318938', '', '2025-09-01 15:52:30'),
(8, 'Wolswagen', 'ravi@gmail.com', '$2y$10$5hc9EkEG8Fp6Vb5ri8iyD.CoOTuNnXJAr27uESj8oC0fI9YrAxgwC', '', 'tpt', '3521152153', '', '2025-09-01 16:01:29'),
(11, 'TechCrop', 'fdsfs@gmail.com', '$2y$10$51Kz2/xGJaCRzEed1fhtku3F3DmtYuBJonJw6hm/tBwSXhN/sa4w.', '', 'dsf', '54353', '', '2025-09-01 17:30:15'),
(15, 'Wolswagen', 'fgfd@gmail.com', '$2y$10$YRdXkckSzPJJrzbjKyn2OOVUFrOO6iJlwRPeRYDJBcBQtKEjtEYCW', '', 'gdf', '42342443534', '', '2025-09-01 17:54:33'),
(17, 'Wolswagen', 'dfdsnmm@gmail.com', '$2y$10$RbOzbT.MVc.3dewhJdc9OuxEc4OWWW8XfyaPLrbuz8hM0FlRG25iC', '', 'gdf', '42342443534', '', '2025-09-01 17:55:16'),
(18, 'T3x', 'jghjd@gmail.com', '$2y$10$CEXxfPtIy13gisS63gTPfuIZJWeA6imB3AAUtYHUFgnC1IbE5aImm', '', 'fsdf', '3521152153', '', '2025-09-01 17:55:46'),
(19, 'starterwave', 'starterwave25@gmail.com', '$2y$10$aJxZFqJKKhtBzEmi1Eq3Ne1H811v.oRZCRAnBs/74XNfFCaRsZHMu', '', 'tirupati', '0', '', '2025-09-02 10:23:04'),
(20, 'PET ', 'vennela@gmail.com', '$2y$10$GRUAHOvVXWEnd3PiJatcg.23fe9hdH4.kofbh4IhTpnobvjX94pjq', '', 'grfdc', '8512318938', '', '2025-09-02 19:46:08'),
(21, 'sdfg', 'error@gmail.com', '$2y$10$CHbfanrzhfn5ndH43zaF.OmpgbkuM6qBjGEdDVO95/xIGhJFbWJ52', '', 'dsfgh', '23456', '', '2025-09-05 10:19:12'),
(22, 'Jasstech', 'jasu5511246@gmail.com', '$2y$10$CxXDlxZUQWhmPGTldLQguOEem8mJx0UHgC.1apRdVrooJ6YLyBzI2', '', 'Tirupati', '7981629173', 'We are a leading technology company focused on innovation and excellence in software development.', '2025-09-07 12:03:43'),
(23, 'jastechcrop', 'abcd5511246@gmail.com', '$2y$10$4N1onDLkRDss7JWgEaxOw.ekkcEItJOqoiYe17tDmDr5nyfz.h21K', '', 'Tirupati , Andhrapardesh', '7981629173', 'MY company is to provider the all type of services', '2025-09-07 12:12:41'),
(24, 'sharuktech', 'sharuk12345678@gmail.com', '$2y$10$oDWChxVOH5bP6n3xE.gKqeY/0x71fU7Tv5artqHXq8eYYTh8ZU58u', '', 'Adoni', '1234567890', 'this is hightly professional company', '2025-09-14 16:31:05'),
(28, 'alpha', 'alpha1234567@gmail.com', '$2y$10$8oujYkHTJc7Z9IiOriQIfuwlDY3EAQLOfKNSQxAhCHoSv9HLRdOf6', '', 'Palasa', '123', 'This is my company', '2025-09-14 16:45:43'),
(33, 'alpha', 'alpha123456711@gmail.com', '$2y$10$MFE.6uLiq6n5meVWsuWbX.meT8Gz/kcMLes72FoK2UfAQd9byhgP.', '', 'Tirupati', '1234567890', 'this is my alpha', '2025-09-14 18:00:59'),
(34, 'tharuntech', 'tharunking12345678@gmail.com', '$2y$10$PQvVaSky1wrnSkyzndM6cuUYudDLmOS0Bkze5HRFGRu7l/0jW99Mq', 'Palasa near Reddy Building', 'Palasa', '1234567890', 'ssfdghj', '2025-11-03 16:23:10');

-- --------------------------------------------------------

--
-- Table structure for table `reset_tokens`
--

CREATE TABLE `reset_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` enum('seeker','provider') NOT NULL,
  `email` varchar(255) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `reset_token` varchar(64) DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reset_tokens`
--

INSERT INTO `reset_tokens` (`id`, `user_id`, `user_type`, `email`, `otp`, `reset_token`, `expires_at`, `created_at`) VALUES
(1, 2, 'seeker', 'vyshnavinarala25@gmail.com', '259732', NULL, '2025-09-04 00:24:31', '2025-09-03 18:44:31'),
(2, 2, 'seeker', 'vyshnavinarala25@gmail.com', '992112', NULL, '2025-09-04 00:24:38', '2025-09-03 18:44:38'),
(3, 2, 'seeker', 'vyshnavinarala25@gmail.com', '908698', NULL, '2025-09-04 00:24:39', '2025-09-03 18:44:39'),
(4, 2, 'seeker', 'vyshnavinarala25@gmail.com', '832020', NULL, '2025-09-04 00:24:39', '2025-09-03 18:44:39'),
(5, 2, 'seeker', 'vyshnavinarala25@gmail.com', '548114', NULL, '2025-09-04 00:24:39', '2025-09-03 18:44:39'),
(6, 2, 'seeker', 'vyshnavinarala25@gmail.com', '891833', NULL, '2025-09-04 00:24:40', '2025-09-03 18:44:40'),
(7, 2, 'seeker', 'vyshnavinarala25@gmail.com', '617221', NULL, '2025-09-04 00:24:48', '2025-09-03 18:44:48'),
(8, 2, 'seeker', 'vyshnavinarala25@gmail.com', '788585', NULL, '2025-09-04 00:24:50', '2025-09-03 18:44:50'),
(9, 2, 'seeker', 'vyshnavinarala25@gmail.com', '393188', NULL, '2025-09-04 00:24:51', '2025-09-03 18:44:51'),
(10, 2, 'seeker', 'vyshnavinarala25@gmail.com', '435173', NULL, '2025-09-04 00:24:53', '2025-09-03 18:44:53'),
(11, 2, 'seeker', 'vyshnavinarala25@gmail.com', '498231', NULL, '2025-09-04 00:24:54', '2025-09-03 18:44:54'),
(12, 2, 'seeker', 'vyshnavinarala25@gmail.com', '996709', NULL, '2025-09-04 00:24:55', '2025-09-03 18:44:55'),
(13, 2, 'seeker', 'vyshnavinarala25@gmail.com', '636386', NULL, '2025-09-04 00:24:57', '2025-09-03 18:44:57'),
(14, 2, 'seeker', 'vyshnavinarala25@gmail.com', '793828', NULL, '2025-09-04 00:24:58', '2025-09-03 18:44:58'),
(15, 2, 'seeker', 'vyshnavinarala25@gmail.com', '454878', NULL, '2025-09-04 00:25:00', '2025-09-03 18:45:00'),
(16, 2, 'seeker', 'vyshnavinarala25@gmail.com', '452293', NULL, '2025-09-04 00:25:02', '2025-09-03 18:45:02'),
(17, 2, 'seeker', 'vyshnavinarala25@gmail.com', '813468', NULL, '2025-09-04 00:54:19', '2025-09-03 19:14:19'),
(18, 2, 'seeker', 'vyshnavinarala25@gmail.com', '973385', NULL, '2025-09-04 01:37:32', '2025-09-03 19:57:32'),
(19, 2, 'seeker', 'vyshnavinarala25@gmail.com', '743115', NULL, '2025-09-04 01:48:21', '2025-09-03 20:08:21'),
(20, 2, 'seeker', 'vyshnavinarala25@gmail.com', '169824', NULL, '2025-09-04 01:48:21', '2025-09-03 20:08:21'),
(23, 10, 'seeker', 'bhavanaendrathi@gmail.com', '840571', NULL, '2025-09-06 15:19:44', '2025-09-06 09:39:44'),
(24, 10, 'seeker', 'bhavanaendrathi@gmail.com', '492966', NULL, '2025-09-06 15:19:49', '2025-09-06 09:39:49'),
(25, 10, 'seeker', 'bhavanaendrathi@gmail.com', '547462', NULL, '2025-09-06 15:19:49', '2025-09-06 09:39:49'),
(26, 10, 'seeker', 'bhavanaendrathi@gmail.com', '948123', NULL, '2025-09-06 15:19:52', '2025-09-06 09:39:52'),
(27, 5, 'seeker', 'jasu5511246@gmail.com', '793235', NULL, '2025-09-14 01:37:38', '2025-09-13 19:57:38'),
(28, 5, 'seeker', 'jasu5511246@gmail.com', '576663', NULL, '2025-09-14 01:37:39', '2025-09-13 19:57:39'),
(29, 5, 'seeker', 'jasu5511246@gmail.com', '263003', NULL, '2025-09-14 01:37:49', '2025-09-13 19:57:49'),
(30, 5, 'seeker', 'jasu5511246@gmail.com', '502551', NULL, '2025-09-14 01:37:50', '2025-09-13 19:57:50'),
(31, 5, 'seeker', 'jasu5511246@gmail.com', '341524', NULL, '2025-09-14 01:37:51', '2025-09-13 19:57:51'),
(32, 5, 'seeker', 'jasu5511246@gmail.com', '851001', NULL, '2025-09-14 01:37:51', '2025-09-13 19:57:51'),
(33, 5, 'seeker', 'jasu5511246@gmail.com', '401273', NULL, '2025-09-14 01:37:51', '2025-09-13 19:57:51'),
(34, 5, 'seeker', 'jasu5511246@gmail.com', '311259', NULL, '2025-10-22 01:34:50', '2025-10-21 19:54:50'),
(35, 5, 'seeker', 'jasu5511246@gmail.com', '776962', NULL, '2025-10-22 01:34:51', '2025-10-21 19:54:51'),
(36, 5, 'seeker', 'jasu5511246@gmail.com', '424752', NULL, '2025-10-22 01:35:48', '2025-10-21 19:55:48'),
(37, 5, 'seeker', 'jasu5511246@gmail.com', '521422', NULL, '2025-10-22 02:15:39', '2025-10-21 20:35:39');

-- --------------------------------------------------------

--
-- Table structure for table `saved_jobs`
--

CREATE TABLE `saved_jobs` (
  `saved_id` int(11) NOT NULL,
  `seeker_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `job_title` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_jobs`
--

INSERT INTO `saved_jobs` (`saved_id`, `seeker_id`, `job_id`, `job_title`) VALUES
(73, 5, 22, 'helper'),
(75, 16, 22, 'helper'),
(76, 5, 28, 'blood collectoe'),
(80, 11, 26, 'watchman'),
(84, 5, 30, 'teas'),
(86, 11, 21, 'team'),
(87, 11, 22, 'helper');

-- --------------------------------------------------------

--
-- Table structure for table `seekers`
--

CREATE TABLE `seekers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` bigint(10) NOT NULL,
  `age` int(5) NOT NULL,
  `skills` text NOT NULL,
  `location` varchar(100) NOT NULL,
  `about` varchar(500) NOT NULL,
  `education` varchar(200) NOT NULL,
  `availability` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seekers`
--

INSERT INTO `seekers` (`id`, `name`, `email`, `password`, `phone`, `age`, `skills`, `location`, `about`, `education`, `availability`, `created_at`) VALUES
(1, 'bhavana', 'djbcskdjc@gmail.com', '$2y$10$AbyUJLwAYQgkTXbTTtvJi.81ERg8yN5TdT.gKuNjl2GlE0Y2TF/gG', 1234567890, 18, 'programming', 'Tirupati', '', '', '', '2025-09-01 05:52:21'),
(2, 'Vyshnavi Narala', 'vyshnavinarala25@gmail.com', '$2y$10$aYoSABQzHEHpWyRnN5gyTOcNTIdUkIlGl9ygwuIoXMzaLL77lY3wK', 2147483647, 18, 'programming', 'Tirupati', '', '', '', '2025-09-01 18:55:39'),
(3, 'Kanithi', 'ravi@gmail.com', '$2y$10$9sLmdORZRvHQ8H9zd9kaYOquHztUctkn4a/8GxI335t3gWXH6yAiG', 2147483647, 17, 'programming', 'Tirupati', '', '', '', '2025-09-02 06:52:55'),
(4, 'abcd', 'ebz@gmail.com', '$2y$10$BU1BRCcAqPZrjMgeukb2uOiwhWeDi4gAwkOYJiSkFhS78K4lZWp0i', 1234567890, 18, 'programming', 'Tirupati', '', '', '', '2025-09-02 10:20:05'),
(5, 'Jaswant', 'jasu5511246@gmail.com', '$2y$10$HaK963.bc7I/fDqyTpaBfenhL9GnhzCrx7A73WQtQxBdhCi/Oa/iK', 7981629173, 25, 'Bike repair, bike riding', 'Tirupati , Andhrapardesh', 'i am a good developer and i have completed my Btech from JNTUK \n                            \n                            \n                            ', 'Diploma of Computer Science , S.V.goverment polythechnic college , 2023-2026\nBtech , JNTUK , 2026-2029\n', 'immediate', '2025-09-02 10:29:23'),
(6, 'Vyshnavi Narala bmn', 'vyshnavinarala25@gmail.com', '$2y$10$iWIe0558Ij.UtRr6KR8y3esHnHYTqM4uEhCms5e6PyM.0669yLsKm', 2147483647, 18, 'programming', 'Tirupati', '', '', '', '2025-09-02 10:37:38'),
(7, 'Vyshnavi Narala bmn', 'vyshnavinarala25@gmail.com', '$2y$10$iWIe0558Ij.UtRr6KR8y3esHnHYTqM4uEhCms5e6PyM.0669yLsKm', 2147483647, 18, 'programming', 'Tirupati', '', '', '', '2025-09-02 10:38:04'),
(8, 'Vyshnavi Narala bmn', 'vyshnavinarala25@gmail.com', '$2y$10$iWIe0558Ij.UtRr6KR8y3esHnHYTqM4uEhCms5e6PyM.0669yLsKm', 2147483647, 18, 'programming', 'Tirupati', '', '', '', '2025-09-02 10:39:46'),
(9, 'PAGDIMANU MOUNIKA', 'pagidimanumounika@gmail.com', '$2y$10$Hn/e77ZSj7AExafxpHHEGuEh0sdsQ53lSDSl0cMw5.SVjvvKpdwbe', 2147483647, 17, 'running', 'Tirupati', '', '', '', '2025-09-02 16:55:33'),
(10, 'Bhavana', 'bhavanaendrathi@gmail.com', '$2y$10$IyvpBMlrvEFDHlhLCldUQugzOHr3n.Y2q6SNdsOXVgn4zcMfY46jO', 2147483647, 18, 'programming', 'Tirupati', '', '', '', '2025-09-06 09:38:21'),
(11, 'Jaswant Karri', 'abcd5511246@gmail.com', '$2y$10$TK7teU04pZEnrYiO.9DL/OAhK2Zc3Y9RjKbRwKPFRjMgsN5hoP4HW', 7981629173, 18, 'mechanic work', 'Tirupati', 'i am jaswant karri i have completed my diploma in computer science                    \n                            \n                            \n                            \n                            \n                            ', 'Diploma in computer science , svgp , 2026-2029\nBtech , JNTUK , 2026-2029\nMtech , IITBombay , 2029-2031\n', 'immediate', '2025-09-09 10:19:44'),
(18, 'abhi', 'abhi12345678@gmail.com', '$2y$10$6oRGpZ4g2OpLbCyAAa0PiODSS4ZFqTXtjwny7vKgRNYPzl5HhLg6K', 7981629173, 25, '', 'Palasa', '', '', '', '2025-10-12 05:39:12');

-- --------------------------------------------------------

--
-- Table structure for table `shortlisted`
--

CREATE TABLE `shortlisted` (
  `shortlist_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `provider_id` int(11) NOT NULL,
  `seeker_id` int(11) NOT NULL,
  `shortlisted_time` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shortlisted`
--

INSERT INTO `shortlisted` (`shortlist_id`, `job_id`, `provider_id`, `seeker_id`, `shortlisted_time`) VALUES
(8, 24, 23, 5, '2025-10-14'),
(9, 24, 23, 18, '2025-10-14'),
(10, 22, 23, 18, '2025-10-14'),
(12, 24, 23, 11, '2025-10-18'),
(13, 30, 23, 5, '2025-10-18'),
(14, 28, 22, 5, '2025-10-22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applied_job`
--
ALTER TABLE `applied_job`
  ADD PRIMARY KEY (`applied_jobid`);

--
-- Indexes for table `hired`
--
ALTER TABLE `hired`
  ADD PRIMARY KEY (`hired_id`);

--
-- Indexes for table `posted_jobs`
--
ALTER TABLE `posted_jobs`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`provider_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  ADD PRIMARY KEY (`saved_id`);

--
-- Indexes for table `seekers`
--
ALTER TABLE `seekers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shortlisted`
--
ALTER TABLE `shortlisted`
  ADD PRIMARY KEY (`shortlist_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applied_job`
--
ALTER TABLE `applied_job`
  MODIFY `applied_jobid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `hired`
--
ALTER TABLE `hired`
  MODIFY `hired_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `posted_jobs`
--
ALTER TABLE `posted_jobs`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `provider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `reset_tokens`
--
ALTER TABLE `reset_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  MODIFY `saved_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `seekers`
--
ALTER TABLE `seekers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `shortlisted`
--
ALTER TABLE `shortlisted`
  MODIFY `shortlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
