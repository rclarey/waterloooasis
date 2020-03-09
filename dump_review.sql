-- MySQL dump 10.13  Distrib 5.7.23, for osx10.12 (x86_64)
--
-- Host: localhost    Database: waterloo_oasis_dev
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `date_time` datetime NOT NULL,
  `edited` tinyint(1) NOT NULL DEFAULT '0',
  `text` varchar(512) NOT NULL,
  `likes` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `job_id` (`job_id`),
  KEY `parent_id` (`parent_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `comment_ibfk_4` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,2,NULL,11,'2019-08-02 20:07:05',0,'root comment',1),(2,1,2,1,11,'2019-08-02 20:07:51',0,'reply 1',0),(3,1,2,1,11,'2019-08-02 20:07:58',0,'reply 2',0),(4,1,2,2,12,'2019-08-02 20:08:34',0,'reply 1 reply',0),(5,1,2,3,12,'2019-08-02 21:10:41',0,'reply 2 reply',0),(6,1,2,NULL,11,'2019-08-03 21:38:14',0,'test comment\n\nsecond line',0),(13,2,3,NULL,11,'2019-08-03 22:16:51',0,'first',1),(14,2,3,NULL,11,'2019-08-03 22:19:05',0,'second',1),(15,1,2,NULL,11,'2019-08-03 22:19:31',0,'Mercari rocks!',0),(16,1,2,NULL,11,'2019-08-04 15:27:47',0,'bump',1),(17,1,2,1,11,'2019-08-04 23:25:07',0,'before',1),(18,1,2,NULL,11,'2019-08-04 23:26:25',0,'bumpity',1),(19,1,2,18,11,'2019-08-04 23:27:18',0,'asdf',1),(20,1,2,4,11,'2019-08-05 01:08:47',0,'yo',1);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_fk1_idx` (`user_id`),
  KEY `comment_id_fk1_idx` (`comment_id`),
  CONSTRAINT `comment_id_fk1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `user_id_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
INSERT INTO `comment_likes` VALUES (2,12,1),(9,11,14),(10,11,13),(13,11,16),(14,11,19),(15,11,18),(16,11,20),(17,15,17);
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `description` varchar(512) NOT NULL,
  `short_name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Mercari','desc','mercari'),(2,'Facebook','desc','facebook'),(3,'Google','desc','google'),(4,'Cockroach Labs','desc','cockroach'),(5,'LinkedIn','desc','linkedin'),(6,'Microsoft','desc','microsoft'),(7,'PagerDuty','desc','pagerduty'),(8,'Osellus','',''),(20,'Google ','','');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `following`
--

DROP TABLE IF EXISTS `following`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `following` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `following_fk1_idx` (`user_id`),
  KEY `following_fk2_idx` (`job_id`),
  CONSTRAINT `following_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `following_fk2` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `following`
--

LOCK TABLES `following` WRITE;
/*!40000 ALTER TABLE `following` DISABLE KEYS */;
INSERT INTO `following` VALUES (37,15,2);
/*!40000 ALTER TABLE `following` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_code` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `status` varchar(128) NOT NULL,
  `status_stage` int(11) NOT NULL,
  `status_round` int(11) NOT NULL DEFAULT '1',
  `location` varchar(50) NOT NULL,
  `description` varchar(512) NOT NULL,
  `company_id` int(11) NOT NULL,
  `term_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `short_code_UNIQUE` (`short_code`),
  KEY `company_id` (`company_id`),
  KEY `term_id` (`term_id`),
  CONSTRAINT `job_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `job_ibfk_2` FOREIGN KEY (`term_id`) REFERENCES `term` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (2,'8azgnmhT','Software Engineering Intern','Interview selections complete',2,3,'Tokyo, Japan','At Mercari, our mission is to create value in a global marketplace where anyone can buy & sell, and we pride ourselves in taking on a challenge. We are looking for new members to join us in achieving this goal under our values - Go Bold, All for One, and Be Professional.\n株式会社メルカリでは「新たな価値を生みだす世界的なマーケットプレイスを創る」というミッションを掲げ、あらゆる挑戦をしています。「Go Bold - 大胆にやろう」「All for One - 全ては成功のために」「Be Professional - プロフェッショナルであれ」という3つのバリューのもと、ミッション達成を共に目指していける仲間を募集しています。',1,1),(3,'V3XI1QvR','Software Engineering Intern','Interview selections complete',2,1,'Menlo Park, USA','desc',2,1),(4,'kPYAIoy1','Software Engineering Intern','Coding challenge out',2,1,'Waterloo, Canada','desc',3,1),(5,'g-4HuUAh','Backend Engineering Intern','Applications available',1,1,'New York, USA','desc',4,1),(6,'_NAqzKrA','Systems and Infrastructure Engineering Intern','Rankings out',3,1,'Sunnyvale, USA','desc',5,1),(7,'as7qzKrA','Software Engineering Intern','Applications available',1,1,'Redmond, USA','desc',6,1),(8,'9HNk_-q2','Site Reliability Engineering Intern','Interviews selections complete',2,1,'San Francisco, USA','desc',7,1);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `ratings_fk1_idx` (`user_id`),
  KEY `ratings_fk2_idx` (`job_id`),
  CONSTRAINT `ratings_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `ratings_fk2` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (2,11,2,3);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `position` varchar(128) NOT NULL,
  `faculty` varchar(4) NOT NULL,
  `term` varchar(4) NOT NULL,
  `year` int(11) NOT NULL,
  `season` varchar(8) NOT NULL,
  `city` varchar(32) NOT NULL,
  `app_source` varchar(32) NOT NULL,
  `recruitment_review` varchar(512) DEFAULT NULL,
  `interview_review` varchar(512) DEFAULT NULL,
  `internship_review` varchar(512) DEFAULT NULL,
  `internship_state` int(11) NOT NULL,
  `interview_state` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (3,15,8,'test','AHS','1A',2013,'Winter','toronto','Jobmine/WaterlooWorks',NULL,NULL,NULL,3,2,4),(4,15,20,'SDE','ENG','3A',2016,'Summer','Toronto','Job Fair',NULL,NULL,NULL,1,1,3);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `term`
--

DROP TABLE IF EXISTS `term`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `term` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `term` enum('fall','winter','spring') DEFAULT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `full_term` (`term`,`year`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `term`
--

LOCK TABLES `term` WRITE;
/*!40000 ALTER TABLE `term` DISABLE KEYS */;
INSERT INTO `term` VALUES (1,'fall',2019);
/*!40000 ALTER TABLE `term` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(50) NOT NULL,
  `hash` varchar(344) NOT NULL,
  `salt` varchar(44) NOT NULL,
  `log_rounds` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'FuriousRaccoon','','','',1),(2,'HissingWalrus','','','',1),(3,'FeignedChameleon','','','',1),(4,'VoraciousMaltese','','','',1),(11,'LateAkita','asdf@edu.uwaterloo.ca','1BkgrBa6QTZEwf5PSxdptEOsm465y02Z63HA85YUfubkegsh5yu97SJDYoAh5jGoFjMaIs6eDNrrqHqSVVYi2LVnwj4dzq83jg2iC9asx00WJiccDd4sAEWaaMbUX7/I7MGjgYQ+FnPjZxUu8vUblCk01PRxVoMEAHAHNf1Ez8hsMbLa+dfK613VruTYqpj63pbPn0RopyAZutXdvYfzncx/fyBVEcR+wSC+yCjiIUlhGYtFHhwK/slf+PCKGbLrAoi5sR53chT2eV6CaaJlDsuOcjCopKSbApZ6lSs1X02A43fKIlGmSt0RMbXpmwREzwFdLFTFAKThuRRvn0ahMw==','xzUcuxXxNkc1nZZ4pUtRMqycrlDYNpvQwZBv8ak+Ri0=',1),(12,'ResoluteWallaby','qwer@edu.uwaterloo.ca','L88pginjsGknTC7AAmXZSga8E2j/Ez66v+PRzPxEEk7D4i2s5NHdiSHvMTE9eQyF9IsQ2hOe7YJ40HZNgnvfDD+Oh2A4SeeAboCk52HMtMm922DE5LPlXVjQh8xXUt03rOqjwHBaIv/z9Fo2MH4sihNhGwhbCWLnrc8j5eCVKmy8yRgwCtE8fXF/UxGO68HAGolEn1u59Rf0nCnJp7vzn86tO2pcxQ3ZfIfsL8l3QR70c7W3REOrt6OeZIw+fi9cXWOfPuBOE/wcE/sFV8urQxmi+2jhAiYugNAygARdzf6/QqsFsxGroXXURBOBQKeuh6flWqMUFPphOiTOMfMzKA==','dfjmxfGiFiVK2v65frPcnWWWuDed/tmSY5JCbX4vYLA=',1),(14,'MushyEarwig','reclarey@edu.uwaterloo.ca','FKyQ1/EjM/eHbMs6VMtOYwF3I6TFO5uWZI+rf+R5h3J5dGGnGp2KaSqn3v8DkDVFKeKopw2+4qYe7qK/n/1XeXZHZamFEKFzfsH4YzBpMo+Um5gaTtjabUrDzhuV3flRjKkNm3ziEp3AjDO8ZvhPYOff1rc6NJPjKl0yP4/bgdmUADU1a5NLVBw8EqimPyEvEkQ5DlTa3UBlq7PH1faYN10n4DgcuwZnKAafCRu+RLIRk2I3PCU+W0n2Bcq6OpyecknxqvDbyiM7BG3jNaN7Kt1Ccpmis+47+MlAzZ/3U1bIk7RqNtDvX/R7AO/WJF+tr6Ge9J5GxDvrCgS5l2mp6A==','jVTYPEHBGJsNg+rMcVJ0u5lwgU00Z6LJH0x3AX/XzSo=',1),(15,'GorgeousSaola','r32lam@edu.uwaterloo.ca','Vfs/Om4MyPV8mk8Rd04tj/AjcXqck+ECkaWJfFHNtJPCZY6hfezcla07rKkkS2RPZbopRWsgwxKRglRFy8D31mm2nfPT80Rq17dMfOMYaksMRKJkzz/lzwikztDIshhwNERN4vePj4J3N2nn55ZgFSmBoUhcUzSoaIcLuTXgNBCBssyqM8a4JopEAaZZHzFl9DKZshxe2PY5MonRzqC4/7O1LeKefTsN64S3mOmh88d9aJY5IAAlbxB83TuxgWbU10Aa1Mhj6FLWW+KTr0XCZzJ9Vm8Z3W6Bi4aJPLgHoJK/PvlddqQ38RdyNz6pEUKmxkp3P6Lea2nm7OqTLMbOHQ==','u0HYO4MXxmwRo89Ksd8Bstkk2jlmEZAgAAmIH1TZ2+w=',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification`
--

DROP TABLE IF EXISTS `verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `verification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `hash` varchar(344) NOT NULL,
  `salt` varchar(44) NOT NULL,
  `code` varchar(45) DEFAULT NULL,
  `expires` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification`
--

LOCK TABLES `verification` WRITE;
/*!40000 ALTER TABLE `verification` DISABLE KEYS */;
INSERT INTO `verification` VALUES (8,'r32lam@edu.uwaterloo.ca','8HfMbZ/WqNNWDhL2dMggixu6nYbLr6XEehd3s6766zVJAH8mL+Qw7opQgnlrSp05TLQjlbaAtLB+iSxtk+uJ65TOJyZAJb7rtp/75277KuUDxX76IapNlMgMkA95EgCVdi95cnBuuk35w8Po8mYEqlC1Q6M1cZ+CRslH4rvNUMEhKXC8z5UdsnAagFwVGAVAcIbw4xmZZsz5YiUQUnCnK+LI2R0UNqwt0exCrPQ591LsXUMHm63BIA5bIamFGh1huXnwVXRgnHyRNTQmq+aTG8AXmbdCQqXD+werEEiNH6o68SnKzWO3I2UcffpMD00goQPYlxVt/JJ2YuvWlHSW2A==','VewMexeuoSvnERJtiXK4S5El7p6/RYsqk1kuvEtYrvE=','FSWXnTGJ5k6672LIIrVyR04m0MrWOAJaTiouuwq4_9V2','2020-02-14 18:23:44');
/*!40000 ALTER TABLE `verification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-21 18:34:47
