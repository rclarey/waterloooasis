# ************************************************************
# Sequel Pro SQL dump
# Version 5224
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 8.0.16)
# Database: waterloo_oasis_dev
# Generation Time: 2019-08-02 05:47:46 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comment`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;

INSERT INTO `comment` (`id`, `author_id`, `date_time`, `text`, `likes`, `parent_id`, `job_id`)
VALUES
	(1,1,'2019-06-11 21:11:01','Coding challenge out yet?',5,NULL,2),
	(2,2,'2019-06-12 20:11:01','Yeah. I\'ve heard they happen on a rolling basis tho so keep that in mind.',5,1,2),
	(3,3,'2019-06-10 20:11:01','Anyone have experience interviewing here?',2,NULL,2),
	(4,4,'2019-06-10 10:11:01','I\'ve interned here before if anyone has questions',3,NULL,2);

/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table company
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `description` varchar(512) NOT NULL,
  `short_name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;

INSERT INTO `company` (`id`, `name`, `description`, `short_name`)
VALUES
	(1,'Mercari','desc','mercari'),
	(2,'Facebook','desc','facebook'),
	(3,'Google','desc','google'),
	(4,'Cockroach Labs','desc','cockroach'),
	(5,'LinkedIn','desc','linkedin'),
	(6,'Microsoft','desc','microsoft'),
	(7,'PagerDuty','desc','pagerduty');

/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table job
# ------------------------------------------------------------

DROP TABLE IF EXISTS `job`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;

INSERT INTO `job` (`id`, `short_code`, `title`, `status`, `status_stage`, `pay`, `description`, `company_id`, `term_id`)
VALUES
	(2,'8azgnmhT','Software Engineering Intern','Interview selections complete',2,9001,'At Mercari, our mission is to create value in a global marketplace where anyone can buy & sell, and we pride ourselves in taking on a challenge. We are looking for new members to join us in achieving this goal under our values - Go Bold, All for One, and Be Professional.\n株式会社メルカリでは「新たな価値を生みだす世界的なマーケットプレイスを創る」というミッションを掲げ、あらゆる挑戦をしています。「Go Bold - 大胆にやろう」「All for One - 全ては成功のために」「Be Professional - プロフェッショナルであれ」という3つのバリューのもと、ミッション達成を共に目指していける仲間を募集しています。',1,1),
	(3,'V3XI1QvR','Software Engineering Intern','Interview selections complete',2,7500,'desc',2,1),
	(4,'kPYAIoy1','Software Engineering Intern','Coding challenge out',2,7500,'desc',3,1),
	(5,'g-4HuUAh','Backend Engineering Intern','Applications available',1,8000,'desc',4,1),
	(6,'_NAqzKrA','Systems and Infrastructure Engineering Intern','Rankings out',3,7800,'desc',5,1),
	(7,'as7qzKrA','Software Engineering Intern','Applications available',1,7200,'desc',6,1),
	(8,'9HNk_-q2','Site Reliability Engineering Intern','Interviews selections complete',2,7400,'desc',7,1);

/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table replies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `replies`;

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



# Dump of table term
# ------------------------------------------------------------

DROP TABLE IF EXISTS `term`;

CREATE TABLE `term` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `term` enum('fall','winter','spring') DEFAULT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `full_term` (`term`,`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `term` WRITE;
/*!40000 ALTER TABLE `term` DISABLE KEYS */;

INSERT INTO `term` (`id`, `term`, `year`)
VALUES
	(1,'fall',2019);

/*!40000 ALTER TABLE `term` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table thread
# ------------------------------------------------------------

DROP TABLE IF EXISTS `thread`;

CREATE TABLE `thread` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `title` varchar(128) NOT NULL,
  `comment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `thread_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(50) NOT NULL,
  `hash` varchar(344) NOT NULL,
  `salt` varchar(44) NOT NULL,
  `log_rounds` int(11) NOT NULL,
  `anonymous` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `email`, `hash`, `salt`, `log_rounds`, `anonymous`)
VALUES
	(1,'FuriousRaccoon','','','',1,0),
	(2,'HissingWalrus','','','',1,0),
	(3,'FeignedChameleon','','','',1,0),
	(4,'VoraciousMaltese','','','',1,0),
	(10,'GiftedMole','reclarey@edu.uwaterloo.ca','fr5qId2dfZo3w3eN2EUnyGzsrBb8aoHHcQWGzSKeQ/f67XUhTIyLdNYjW/UCkwA4H7JQGFGX4Z4hQDOwKmNN2Iy4YaHsEE2pilwo6fp4U7Oqz17mvE4EPlQ7hVi8tAPK3MCVvv0c0z/Jl5ss4UGD/aYTf7wM+i5UzaJQUdI6kVr69HPdvJIRjoiCvIMBw2eCB5SF4LSEKDY1yGvenBkYNRiKCOGZk3LLUSY9NKtuDE/VXE2OLhZel1bDH/5WgutJoaowT5rKu9QRz+Aa+0QyqOK7KcO+FZiBPEP8JaOKeID8yTGaQtThsWgUj1MH+94fDNNJRqxRS15AI2245UZPpA==','35a6cvHUHCuOhBBx2r1Y5FszT4Ou1jmpuAzM2+AxRm0=',1,0),
	(11,'LateAkita','asdf@edu.uwaterloo.ca','1BkgrBa6QTZEwf5PSxdptEOsm465y02Z63HA85YUfubkegsh5yu97SJDYoAh5jGoFjMaIs6eDNrrqHqSVVYi2LVnwj4dzq83jg2iC9asx00WJiccDd4sAEWaaMbUX7/I7MGjgYQ+FnPjZxUu8vUblCk01PRxVoMEAHAHNf1Ez8hsMbLa+dfK613VruTYqpj63pbPn0RopyAZutXdvYfzncx/fyBVEcR+wSC+yCjiIUlhGYtFHhwK/slf+PCKGbLrAoi5sR53chT2eV6CaaJlDsuOcjCopKSbApZ6lSs1X02A43fKIlGmSt0RMbXpmwREzwFdLFTFAKThuRRvn0ahMw==','xzUcuxXxNkc1nZZ4pUtRMqycrlDYNpvQwZBv8ak+Ri0=',1,0),
	(12,'PumpedMillipede','dmgnespo@edu.uwaterloo.ca','pXQ5h05cbsjcbZlHVlOgNMoDOrIUKX0DyG/Gl5gG5G+B8w0rksX6POvEEb6feqCpSfU29ncKgCOcekXL2PqAew3Y6QHEOTWCJgkUAiR0z7vcvZeK6Ozq0DZMr1KREGKbPle86WpFsJIjg+eyZp0Bev8Qr+/6LfevzRuwDbuQxhSgYPAujPKO6r7t9ohjh3AmD152ze1h6l/kbe1UThXgZFriTMOi5n7cyTOXrgGXVXANXDRmtovcpDudg8ockyyxlpdrPkjVSRimvapQfCZ8H1UxMCSc9pSDTS+nmFctERddd1X4JprCbvK7vzeeNXzZpe4zOr09vzuFOP3o63J+CQ==','ohe9YxQirMXYWxSkb/4uhHTxe6+aUhBSiY+FJW81vkI=',1,0),
	(13,'LopsidedLizard','sj7chen@edu.uwaterloo.ca','yka73QGbIV8CW+Bj6KMmF4iLmP/ZQVKdDVkpsrSaCLzurv/k5Zv1teT2zS4vl9dxblXH5g8MZyCa8XMLIQsT0xqrk667+Aug19enTOzooprlDw4daskwXPVTsrWD/YbBtp8Y130SVQEbPG3mpJrcxt9pFI+RQk0z+KM+C2ERba/oPn3SKjUXjQhf9E/6ITHk1sZZ6AcWySZ3f9mTffIYcXBzD27QvvrNhx7zjso050wAJf2+wUM5AhGKTQUV3QM+8oYgEPKX5AG15+ykRCt9Q7PTHAV7Vsg/U2KQUCNu4je/TofYX9Sl33EWKYZwtVYg1eOiPaoAu62iUuJT0ISc8g==','MHooKedWBtrc2qKLhUN6JmoAFfpPiFhJqa/LR7jrmD4=',1,0);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
