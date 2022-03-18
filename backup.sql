-- MySQL dump 10.13  Distrib 8.0.28, for macos12.2 (x86_64)
--
-- Host: localhost    Database: blog_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog_post`
--

DROP TABLE IF EXISTS `blog_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `blog_post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_post`
--

LOCK TABLES `blog_post` WRITE;
/*!40000 ALTER TABLE `blog_post` DISABLE KEYS */;
INSERT INTO `blog_post` VALUES (1,'Started in the tap and Now I\'m Here','By freezing water in a cooler, you force the water to freeze directionally: from the top down. This allows for the ice to form perfect crystals: crystal clear ice! All of the dissolved air and particles end up in the water beneath the ice block.',3,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(2,'The Call Up','Arsenal midfielder Emile Smith Rowe has been added to Gareth Southgate\'s squad for the first time ahead of England\'s upcoming World Cup qualifiers against Albania and San Marino; Smith Rowe: \'It\'s definitely a dream come true. I didn\'t expect it\'',4,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(3,'Super Saka','The wonderkid is only the second player to score a goal against the Citizens in the opening 45 minutes of a Premier League encounter this term, and he has given us a great chance to not only lead going into the break, but potentially get a result here.',2,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(4,'When I missed','Star Bukayo Saka can use \'scar\' of Euro 2020 final penalty miss to push on, says Mikel Arteta. A rsenal boss Mikel Arteta believes Bukayo Saka will use the “scar” from his penalty miss in the final of Euro 2020 to drive him onto bigger and better things.',2,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(6,'Definitive','Actions',31,'2022-03-17 21:00:09','2022-03-17 21:00:09');
/*!40000 ALTER TABLE `blog_post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `post_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `blog_post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Walter White','Awesome post!',1,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(2,'Nadir Patel','Wish it was longer so I could keep reading',3,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(3,'Mikel Arteta','I knew you could push on!',4,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(4,'Ronald McCuddle','If only you learned Sequelize earlier!',3,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(5,'Bemnet Dejene','Good Job!',2,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(6,'Jane Austin','you just keep getting better!',3,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(7,'Peter Parker','Biggest Fan!',1,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(8,'Bemnet Dejene','Keep your head up!',4,'2022-03-17 20:12:57','2022-03-17 20:12:57'),(9,'test90@gmail.com','Great game!',1,'2022-03-17 20:31:15','2022-03-17 20:31:15'),(10,'test90@gmail.com','finalize',1,'2022-03-17 20:32:45','2022-03-17 20:32:45');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
INSERT INTO `Sessions` VALUES ('awXidtkN3o_xVWqoOEUDROzAjMrz8vQM','2022-03-17 23:35:39','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:35:38.999Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 21:05:39','2022-03-17 21:05:39'),('cvgH1c3TgD9rBPN6BvTzCCelbyec9t-L','2022-03-17 23:18:58','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:18:58.091Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 20:48:58','2022-03-17 20:48:58'),('DJ5LK88l2sm9EBWFGZgwTEbQeyC9GVoH','2022-03-17 23:28:50','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:28:50.517Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 20:58:50','2022-03-17 20:58:50'),('H1J9Qc4P4Q2NmOEOhI0ZfEKDvtGzXr8E','2022-03-17 22:47:23','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T22:47:23.577Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 20:17:23','2022-03-17 20:17:23'),('mcoakwBvbagROsQRNCE7p5tLjHLWlbSk','2022-03-17 23:17:00','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:17:00.748Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 20:47:00','2022-03-17 20:47:00'),('nAjkoym2UMsmby0k9M7VpmcApodkc872','2022-03-17 23:03:19','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:03:19.529Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 20:33:19','2022-03-17 20:33:19'),('Nba8Nb90mt3epS7zIgQA5BnwMvGCWILd','2022-03-17 23:17:22','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:17:22.553Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 20:47:22','2022-03-17 20:47:22'),('RJdgUHj-JUuHTfMxltebic7BPJ35VAfW','2022-03-17 23:32:04','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:32:04.729Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 21:02:04','2022-03-17 21:02:04'),('wFLJscOd8KJorEuBnUEn43juDHrPtJd5','2022-03-17 23:35:02','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:35:02.788Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 21:05:02','2022-03-17 21:05:02'),('Wz0lp1cx1SdVTVc_a15_uMI8kRF4eZCJ','2022-03-17 23:21:31','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:21:31.332Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 20:51:31','2022-03-17 20:51:31'),('X_JkyWZrziDJQwq0xs3Tv9dzuCVkQMkB','2022-03-17 23:20:01','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:20:01.450Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 20:50:01','2022-03-17 20:50:01'),('ZMyStCUyFperbaPbouHgSM8f_AAR8Prn','2022-03-17 23:33:30','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:33:30.692Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"}}','2022-03-17 21:03:30','2022-03-17 21:03:30'),('zRQSY3-yD6WfhyH5Iz9kBunX47-57uuj','2022-03-17 23:37:40','{\"cookie\":{\"originalMaxAge\":9000000,\"expires\":\"2022-03-17T23:35:49.239Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"strict\"},\"loggedIn\":true,\"email\":\"stop@gmail.com\"}','2022-03-17 21:05:39','2022-03-17 21:07:40');
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'iceCube','freedom@yahoo.ca','Ice Cube','$2b$10$yPDw7PGbQowGjYh888joIuEgJC.v8tpZUm90GFK/WBhUNLgy2sENe'),(2,'wwBad','bemmyboy20@gmail.com','Walter White','$2b$10$DAU5Dq4kbIc39I6cdKMdTuEcVBSG94qU8JNGxF/CWs4DKQsGhacaa'),(3,'Saka7','saka7@aol.com','Bukayo Saka','$2b$10$GbIm2h8XX6Uq2XcXalYaRek0lFcvMXIwLyv.GieZoMydm.VItqm/2'),(4,'emileSmithRoweYourBoat','biggs@aol.com','Sandler Dizzle','$2b$10$I5f3.k8WoU7VachpygUJNuXhndUBxLlyXCmhiiyo0A90zBKwiG5a.'),(5,'bemmy20','bemnet@gmail.com','Bemnet ','$2b$10$9dt1geqK0SC1DwrkwmDKOuUslTNGv6aYHPELewGQzYdZea56Blgay'),(6,'tester1','test@gmail.com','test','$2b$10$9hTxkaq4Zh6JQcESuwBzMeYo/8V8VgftUo2cxMh1ik5nHVSM6AEku'),(7,'tester 3','test3@gmail.com','test doe','$2b$10$BVVYzrR46Gat2xHhQGiU2epGEqRBtwtxtCrLDk22wwNgnRTlp9HxC'),(8,'test4@gmail.com','test4@gmail.com','test4@gmail.com','$2b$10$kbW2q1BselnHnH9xZSmpGepXcCsOLno.pzAHOo9v2jRlTL49ylrZq'),(9,'test5@gmail.com','test5@gmail.com','test5@gmail.com','$2b$10$4HbCmajL7ye6s.GllYD.nukrzbHOwc39Gql9i0a8aB0uubNBEnWIa'),(10,'test6@gmail.com','test6@gmail.com','test6@gmail.com','$2b$10$YM/GnamUzyJ0y4m39bSV0eyzlFoxchtAJAMfQIJF1x2fzrwp2iesi'),(11,'test8@gmail.com','test8@gmail.com','test8@gmail.com','$2b$10$cir9KjZXreEBc2YrGEaJGev4fsxGyo0OTt8anT2OoV0uugqdc8oZe'),(12,'test9@gmail.com','test9@gmail.com','test9@gmail.com','$2b$10$pcPWbrYIPG3zdIcG9A2X6.NXa5DP88Vskn.sAa9eXhhaZiCIJ35.m'),(13,'test90@gmail.com','test90@gmail.com','test90@gmail.com','$2b$10$lPPq8T8psDXjilAnDx54BOTN/HiYFPYBtyUXJu7MCCFrbjH1FsOOi'),(14,'02-Homework/Develop/controllers/api/homeRoutes.js','g@gmail.com','02-Homework/Develop/controllers/api/homeRoutes.js','$2b$10$EawszjPultjR7.yhetubhO5ZgKHZByd1E5YbMXRi.jHQANEk0zkM.'),(15,'g1@gmail.com','g1@gmail.com','g1@gmail.com','$2b$10$wXXksswQoJ9RUxhZuJtHMu4fzqSF16eQz5rzrM.pEq3Jt8dxXyliy'),(16,'g2@gmail.com','g2@gmail.com','g2@gmail.com','$2b$10$zOhSnQNqOcDkBcRGp0UpBOOWHZqbE/oZzvsuYE/4wyctyfp8qkzAS'),(18,'g4@gmail.com','g4@gmail.com','g4@gmail.com','$2b$10$EUyyQGo1UZjQmKqhW7Qjw.F5N9o6a6A7pD9UVyBmsldPUzWWFCwCi'),(19,'g9@gmail.com','g9@gmail.com','g9@gmail.com','$2b$10$O03zq.EgYUUkImT0//EcYeK9zPVFcbagFFiOr8WKZ/JCAyeosYslW'),(21,'redirect@gmail.com','redirect@gmail.com','redirect@gmail.com','$2b$10$5sI96ez6x2940aFioEYzA.rqPmPT2y2cz6rKhb861z4gq5SgpLjTG'),(22,'redirect1@gmail.com','redirect1@gmail.com','redirect1@gmail.com','$2b$10$pNywByifKiRMA4O8kdXKXOqr.1sb5go5jPifwkppKnUZzxoqgxXLu'),(23,'redirect3@gmail.com','redirect3@gmail.com','redirect3@gmail.com','$2b$10$bXw.ycAqUhutIKZa7o9qyu4dBHkBMVI/CcUeCjcjYgrYVGGVuSzRS'),(24,'send@gmail.com','send@gmail.com','send','$2b$10$4oKIetQHLmZR4aF.KKe9T.BEzF5T7jYdsFXYyn1cMVI4jyDbIVr4C'),(25,'valid@gmail.com','valid@gmail.com','valid','$2b$10$CpJfbHH9n7Qo3/jHTl7F/.z09CCMKY5ziWX81ebWi2rD2ts9jjk9m'),(27,'valid2@gmail.com','valid2@gmail.com','valid2@gmail.com','$2b$10$4L5akBm8ucSBXiTBUFQOleaLKGIubE/HuJFp89XnEHj9gbEDpCL2y'),(28,'valid3@gmail.com','valid3@gmail.com','valid3@gmail.com','$2b$10$lVOuV1jYYi2BhK0zkLvRROd9pabH1vY4mN7Gyrjwp54a7qL19FGYe'),(29,'valid4@gmail.com','valid4@gmail.com','valid4@gmail.com','$2b$10$bhj4hi7KUW8JaW.jpQjzfu7nCZB9EEO5vBQ3krnS37JDC7nhGMdxC'),(30,'bugchecker@gmail.com','bugchecker@gmail.com','bugchecker','$2b$10$o/hRRJRegRYBDS3SEGTczOy8IeiZitKacb2k/NOqW4XecpjCXYe2y'),(31,'limie','saint1@gmail.com','limit','$2b$10$sIIKxwQFZlBcVcVpnPXid.rKkOiNkJAXvi.4LHKzoDU9q.GjkkG9K'),(32,'test manu','testmanu@gmail.com','test manu','$2b$10$4nbTyOCPPTGlDfECbDJfk.qWX9Vv75iaOE15djgGwA2fRl73DEKDy'),(33,'jk@gmail.com','jk@gmail.com','jk@gmail.com','$2b$10$mRDoYZK7TicV84pzzCVuBexDtn9xerMjE2ZKloy0Fpu7jC4gLQGJm'),(35,'dfda','dfa@gmail.com','dfa','$2b$10$K7Z3G8NMtMEoknRuns.5EOqSsPcp.kEOSbrQWoqV24vhd9IpGLaxK'),(36,'stop@gmail.com','stop@gmail.com','stop@gmail.com','$2b$10$JQWxYv6YsM2avrSU2Pwrieogfs4R1XKvxWl/g5LUnNxs2GwmKqwlW');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-18 15:59:39
