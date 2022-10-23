DROP DATABASE IF EXISTS `covid19_system`;
CREATE DATABASE `covid19_system`; 
USE `covid19_system`;

 CREATE TABLE `patients`(
`p_id` varchar(9) NOT NULL,
`p_firstName` varchar(50) NOT NULL,
`p_lastName` varchar(50) NOT NULL,
`p_address` varchar(50) NOT NULL,
`p_city` varchar(50) NOT NULL,
`p_houseNum` int NOT NULL,
`p_birthDate` date NOT NULL,
`p_phone` varchar(9) ,
`p_cellphone` varchar(10) NOT NULL,
  PRIMARY KEY (`p_id`)
);

 CREATE TABLE `vaccinations`(
`v_code` int NOT NULL AUTO_INCREMENT,
`v_pid` varchar(9) NOT NULL,
`v_manufacturer` varchar(50) NOT NULL,
`v_date` date NOT NULL,
  PRIMARY KEY (`v_code`),
  KEY `fk_patientID` (`v_pid`),
  CONSTRAINT `fk_patientID` FOREIGN KEY (`v_pid`) REFERENCES `patients` (`p_id`) ON UPDATE CASCADE
  );

 CREATE TABLE `morbidity`(
`m_code` int NOT NULL AUTO_INCREMENT,
`m_pid` varchar(9) NOT NULL,
`m_dateOfPositiveTest` date NOT NULL,
`m_dateOfRecovery` date NOT NULL,
  PRIMARY KEY (`m_code`),
  KEY `fk_MpatientID` (`m_pid`),
  CONSTRAINT `fk_MpatientID` FOREIGN KEY (`m_pid`) REFERENCES `patients` (`p_id`) ON UPDATE CASCADE
  );