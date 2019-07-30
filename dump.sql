-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: waterloo_oasis_dev
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
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
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `date_time` datetime NOT NULL,
  `text` varchar(512) NOT NULL,
  `likes` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_fk_1_idx` (`author_id`),
  KEY `comment_fk_2_idx` (`parent_id`),
  KEY `comment_fk_3_idx` (`job_id`),
  CONSTRAINT `comment_fk_1` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_fk_2` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`),
  CONSTRAINT `comment_fk_3` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,'2019-06-11 21:11:01','Coding challenge out yet?',5,NULL,2),(2,2,'2019-06-12 20:11:01','Yeah. I\'ve heard they happen on a rolling basis tho so keep that in mind.',5,1,2),(3,3,'2019-06-10 20:11:01','Anyone have experience interviewing here?',2,NULL,2),(4,4,'2019-06-10 10:11:01','I\'ve interned here before if anyone has questions',3,NULL,2);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `description` varchar(512) NOT NULL,
  `short_name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Mercari','desc','mercari'),(2,'Facebook','desc','facebook'),(3,'Google','desc','google'),(4,'Cockroach Labs','desc','cockroach'),(5,'LinkedIn','desc','linkedin'),(6,'Microsoft','desc','microsoft'),(7,'PagerDuty','desc','pagerduty');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `job` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `short_code` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `status` varchar(128) NOT NULL,
  `status_stage` int(11) NOT NULL,
  `pay` int(11) DEFAULT NULL,
  `description` varchar(512) NOT NULL,
  `company_id` int(11) NOT NULL,
  `term_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
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
INSERT INTO `job` VALUES (2,'8azgnmhT','Software Engineering Intern','Interview selections complete',2,9001,'At Mercari, our mission is to create value in a global marketplace where anyone can buy & sell, and we pride ourselves in taking on a challenge. We are looking for new members to join us in achieving this goal under our values - Go Bold, All for One, and Be Professional.\n株式会社メルカリでは「新たな価値を生みだす世界的なマーケットプレイスを創る」というミッションを掲げ、あらゆる挑戦をしています。「Go Bold - 大胆にやろう」「All for One - 全ては成功のために」「Be Professional - プロフェッショナルであれ」という3つのバリューのもと、ミッション達成を共に目指していける仲間を募集しています。',1,1),(3,'V3XI1QvR','Software Engineering Intern','Interview selections complete',2,7500,'desc',2,1),(4,'kPYAIoy1','Software Engineering Intern','Coding challenge out',2,7500,'desc',3,1),(5,'g-4HuUAh','Backend Engineering Intern','Applications available',1,8000,'desc',4,1),(6,'_NAqzKrA','Systems and Infrastructure Engineering Intern','Rankings out',3,7800,'desc',5,1),(7,'as7qzKrA','Software Engineering Intern','Applications available',1,7200,'desc',6,1),(8,'9HNk_-q2','Site Reliability Engineering Intern','Interviews selections complete',2,7400,'desc',7,1);
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `replies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thread_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reply` (`thread_id`,`comment_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`id`),
  CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `term`
--

DROP TABLE IF EXISTS `term`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `thread` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `title` varchar(128) NOT NULL,
  `comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `thread_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(50) NOT NULL,
  `hash` varchar(344) NOT NULL,
  `salt` varchar(44) NOT NULL,
  `log_rounds` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'FuriousRaccoon','','','',1),(2,'HissingWalrus','','','',1),(3,'FeignedChameleon','','','',1),(4,'VoraciousMaltese','','','',1),(11,'LateAkita','asdf@edu.uwaterloo.ca','1BkgrBa6QTZEwf5PSxdptEOsm465y02Z63HA85YUfubkegsh5yu97SJDYoAh5jGoFjMaIs6eDNrrqHqSVVYi2LVnwj4dzq83jg2iC9asx00WJiccDd4sAEWaaMbUX7/I7MGjgYQ+FnPjZxUu8vUblCk01PRxVoMEAHAHNf1Ez8hsMbLa+dfK613VruTYqpj63pbPn0RopyAZutXdvYfzncx/fyBVEcR+wSC+yCjiIUlhGYtFHhwK/slf+PCKGbLrAoi5sR53chT2eV6CaaJlDsuOcjCopKSbApZ6lSs1X02A43fKIlGmSt0RMbXpmwREzwFdLFTFAKThuRRvn0ahMw==','xzUcuxXxNkc1nZZ4pUtRMqycrlDYNpvQwZBv8ak+Ri0=',1),(12,'ResoluteWallaby','qwer@edu.uwaterloo.ca','L88pginjsGknTC7AAmXZSga8E2j/Ez66v+PRzPxEEk7D4i2s5NHdiSHvMTE9eQyF9IsQ2hOe7YJ40HZNgnvfDD+Oh2A4SeeAboCk52HMtMm922DE5LPlXVjQh8xXUt03rOqjwHBaIv/z9Fo2MH4sihNhGwhbCWLnrc8j5eCVKmy8yRgwCtE8fXF/UxGO68HAGolEn1u59Rf0nCnJp7vzn86tO2pcxQ3ZfIfsL8l3QR70c7W3REOrt6OeZIw+fi9cXWOfPuBOE/wcE/sFV8urQxmi+2jhAiYugNAygARdzf6/QqsFsxGroXXURBOBQKeuh6flWqMUFPphOiTOMfMzKA==','dfjmxfGiFiVK2v65frPcnWWWuDed/tmSY5JCbX4vYLA=',1),(14,'MushyEarwig','reclarey@edu.uwaterloo.ca','FKyQ1/EjM/eHbMs6VMtOYwF3I6TFO5uWZI+rf+R5h3J5dGGnGp2KaSqn3v8DkDVFKeKopw2+4qYe7qK/n/1XeXZHZamFEKFzfsH4YzBpMo+Um5gaTtjabUrDzhuV3flRjKkNm3ziEp3AjDO8ZvhPYOff1rc6NJPjKl0yP4/bgdmUADU1a5NLVBw8EqimPyEvEkQ5DlTa3UBlq7PH1faYN10n4DgcuwZnKAafCRu+RLIRk2I3PCU+W0n2Bcq6OpyecknxqvDbyiM7BG3jNaN7Kt1Ccpmis+47+MlAzZ/3U1bIk7RqNtDvX/R7AO/WJF+tr6Ge9J5GxDvrCgS5l2mp6A==','jVTYPEHBGJsNg+rMcVJ0u5lwgU00Z6LJH0x3AX/XzSo=',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verification`
--

DROP TABLE IF EXISTS `verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verification`
--

LOCK TABLES `verification` WRITE;
/*!40000 ALTER TABLE `verification` DISABLE KEYS */;
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

-- Dump completed on 2019-07-30  0:14:31
