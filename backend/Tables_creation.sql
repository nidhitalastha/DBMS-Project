
use apartment;
CREATE TABLE `Owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `dob` date DEFAULT NULL,
  `flat` int(11) DEFAULT NULL,
  `member` int(11) DEFAULT '1',
  `phone` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`,`username`),
  UNIQUE KEY `flat` (`flat`));

CREATE TABLE `Security` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `dob` date DEFAULT NULL,
  `addr` varchar(200) NOT NULL,
  `phone` char(10) DEFAULT NULL,
  `logged_in` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`,`username`)
);

CREATE TABLE `Staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `dob` date DEFAULT NULL,
  `addr` varchar(200) NOT NULL,
  `phone` char(10) DEFAULT NULL,
  `logged_in` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`,`username`)
);

CREATE TABLE `Security_login` (
  `username` varchar(20) DEFAULT NULL,
  `phone` char(10),
  `login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `logout` time DEFAULT NULL,
  KEY `phone` (`phone`,`username`)
);

CREATE TABLE `Staff_login` (
  `username` varchar(20) DEFAULT NULL,
  `phone` char(10),
  `login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `logout` time DEFAULT NULL,
  KEY `phone` (`phone`,`username`)
);

CREATE TABLE `Visitor` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `num` int(11) NOT NULL DEFAULT 1,
  `phone` char(10) DEFAULT NULL,
  `relation` varchar(50) DEFAULT NULL,
  `vehicle` varchar(10) DEFAULT NULL,
  `flat` int(11) NOT NULL,
  `login` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `logout` time DEFAULT NULL,
   FOREIGN KEY (`flat`) REFERENCES `Owner` (`flat`) ON DELETE CASCADE

);

  CREATE TABLE `Delivery` (
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `vehicle` varchar(10) DEFAULT NULL,
  `flat` int(11) NOT NULL,
  `company` varchar(20) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `flat` (`flat`),
  FOREIGN KEY (`flat`) REFERENCES `Owner` (`flat`)
);







