-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: selab
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `admin_data`
--

DROP TABLE IF EXISTS `admin_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_data` (
  `admin_id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_data`
--

LOCK TABLES `admin_data` WRITE;
/*!40000 ALTER TABLE `admin_data` DISABLE KEYS */;
INSERT INTO `admin_data` VALUES ('ADMIN001','John Smith','john.smith@university.edu','hashed_password_123'),('ADMIN002','Sarah Johnson','sarah.j@university.edu','hashed_password_456'),('ADMIN003','Michael Davis','m.davis@university.edu','hashed_password_789'),('ADMIN004','Emily Wilson','emily.wilson@university.edu','hashed_password_101'),('ADMIN005','Robert Taylor','r.taylor@university.edu','hashed_password_202'),('ADMIN006','Jennifer Brown','j.brown@university.edu','hashed_password_303'),('ADMIN007','David Martinez','d.martinez@university.edu','hashed_password_404'),('ADMIN008','Lisa Rodriguez','l.rodriguez@university.edu','hashed_password_505'),('ADMIN009','Kevin Thompson','k.thompson@university.edu','hashed_password_606'),('ADMIN010','Michelle Lee','michelle.lee@university.edu','hashed_password_707'),('ADMIN011','Christopher Moore','c.moore@university.edu','hashed_password_808'),('ADMIN012','Amanda Clark','a.clark@university.edu','hashed_password_909'),('ADMIN013','Matthew Wright','m.wright@university.edu','hashed_password_010'),('ADMIN014','Jessica Harris','j.harris@university.edu','hashed_password_111'),('ADMIN015','Daniel Robinson','d.robinson@university.edu','hashed_password_212'),('ADMIN016','Nicole Scott','n.scott@university.edu','hashed_password_313'),('ADMIN017','William King','w.king@university.edu','hashed_password_414'),('ADMIN018','Rachel Green','r.green@university.edu','hashed_password_515'),('ADMIN019','Steven Adams','s.adams@university.edu','hashed_password_616'),('ADMIN020','Laura Phillips','l.phillips@university.edu','hashed_password_717');
/*!40000 ALTER TABLE `admin_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cultural_events_data`
--

DROP TABLE IF EXISTS `cultural_events_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cultural_events_data` (
  `cultural_event_id` varchar(20) NOT NULL,
  `student_roll_number` varchar(20) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `awards` varchar(100) DEFAULT NULL,
  `description` text,
  `proof` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`cultural_event_id`),
  KEY `fk_student_roll_cul` (`student_roll_number`),
  CONSTRAINT `fk_student_roll_cul` FOREIGN KEY (`student_roll_number`) REFERENCES `students_data` (`roll_number`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cultural_events_data`
--

LOCK TABLES `cultural_events_data` WRITE;
/*!40000 ALTER TABLE `cultural_events_data` DISABLE KEYS */;
INSERT INTO `cultural_events_data` VALUES ('CUL001','2023EE002','Dance','Annual Cultural Fest','University Auditorium','2024-04-10','Best Choreography','Classical dance performance','performance_video_url',1),('CUL002','2023CS003','Music','Spring Concert','Open Air Theater','2024-03-20','Best Vocalist','Solo singing performance','video_url2',1),('CUL003','2023ME004','Drama','Theater Festival','Drama Hall','2024-05-15','Best Actor','Shakespeare play adaptation','performance_url3',1),('CUL004','2023CE005','Art','Art Exhibition','Gallery Space','2024-04-25','Best Installation','Modern art showcase','gallery_url4',1),('CUL005','2023CS007','Photography','Photo Exhibition','Media Center','2024-03-30','Best Portfolio','Nature photography collection','portfolio_url5',1),('CUL006','2023EE006','Dance','Hip-Hop Battle','Student Center','2024-04-05','Runner Up','Contemporary street dance competition','video_url6',1),('CUL007','2023ME008','Music','Band Competition','Music Hall','2024-03-25','Best Band','Rock band performance','performance_url7',1),('CUL008','2023CS010','Film','Short Film Festival','Cinema Hall','2024-05-20','Best Director','10-minute original film','film_url8',1),('CUL009','2023CE009','Art','Sculpture Exhibition','Art Pavilion','2024-04-15','Creative Award','Clay sculpture collection','gallery_url9',1),('CUL010','2023CS011','Photography','Street Photography Contest','Urban Center','2024-03-15','Best Composition','Urban life photography series','portfolio_url10',1),('CUL011','2023EE012','Dance','Folk Dance Festival','Cultural Center','2024-04-20','First Prize','Traditional folk dance performance','video_url11',1),('CUL012','2023ME013','Music','Classical Music Concert','Concert Hall','2024-03-10','Excellence Award','Indian classical music recital','performance_url12',1),('CUL013','2023CS015','Drama','One-Act Play Contest','Experimental Theater','2024-05-25','Best Script','Original one-act play production','performance_url13',1),('CUL014','2023CE014','Art','Digital Art Show','Technology Gallery','2024-04-30','Innovation Award','Digital media art exhibition','gallery_url14',1),('CUL015','2023CS019','Photography','Wildlife Photography Exhibition','Nature Center','2024-03-05','Best Wildlife Photo','Wildlife conservation photography series','portfolio_url15',1),('CUL016','2023EE016','Dance','International Dance Festival','Global Culture Center','2024-04-25','Cultural Excellence','Multi-cultural dance showcase','video_url16',1),('CUL017','2023ME017','Music','Acappella Competition','Acoustic Hall','2024-03-30','Best Arrangement','Vocal harmony performance without instruments','performance_url17',1),('CUL018','2023CS021','Film','Documentary Festival','Media Arts Center','2024-05-10','Impact Award','Social issue documentary screening','film_url18',1),('CUL019','2023CE018','Art','Traditional Arts Fair','Heritage Hall','2024-04-05','Heritage Award','Traditional craft exhibition','gallery_url19',1),('CUL020','2023CS024','Photography','Portrait Photography Contest','Portrait Studio','2024-03-20','Best Portrait','Character portrait series','portfolio_url20',1);
/*!40000 ALTER TABLE `cultural_events_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faculty_data`
--

DROP TABLE IF EXISTS `faculty_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faculty_data` (
  `faculty_id` varchar(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`faculty_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty_data`
--

LOCK TABLES `faculty_data` WRITE;
/*!40000 ALTER TABLE `faculty_data` DISABLE KEYS */;
INSERT INTO `faculty_data` VALUES ('FAC001','Dr. Sarah Williams','s.williams@university.edu','hashedPassword789'),('FAC002','Dr. Michael Brown','m.brown@university.edu','hashedPassword012'),('FAC003','Dr. James Wilson','j.wilson@university.edu','hashedPassword345'),('FAC004','Dr. Emily Martinez','e.martinez@university.edu','hashedPassword678'),('FAC005','Dr. Robert Taylor','r.taylor@university.edu','hashedPassword901'),('FAC006','Dr. Patricia Lee','p.lee@university.edu','hashedPassword234'),('FAC007','Dr. Thomas Moore','t.moore@university.edu','hashedPassword567'),('FAC008','Dr. Jennifer White','j.white@university.edu','hashedPassword890'),('FAC009','Dr. David Clark','d.clark@university.edu','hashedPassword123'),('FAC010','Dr. Lisa Rodriguez','l.rodriguez@university.edu','hashedPassword456'),('FAC011','Dr. Richard Chen','r.chen@university.edu','hashedPassword789'),('FAC012','Dr. Elizabeth Kim','e.kim@university.edu','hashedPassword012'),('FAC013','Dr. Daniel Johnson','d.johnson@university.edu','hashedPassword345'),('FAC014','Dr. Michelle Zhang','m.zhang@university.edu','hashedPassword678'),('FAC015','Dr. Christopher Davis','c.davis@university.edu','hashedPassword901'),('FAC016','Dr. Amanda Wilson','a.wilson@university.edu','hashedPassword234'),('FAC017','Dr. Steven Lee','s.lee@university.edu','hashedPassword567'),('FAC018','Dr. Samantha Brown','s.brown@university.edu','hashedPassword890'),('FAC019','Dr. Jonathan Garcia','j.garcia@university.edu','hashedPassword123'),('FAC020','Dr. Rebecca Martinez','r.martinez@university.edu','hashedPassword456');
/*!40000 ALTER TABLE `faculty_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internship_data`
--

DROP TABLE IF EXISTS `internship_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `internship_data` (
  `internship_id` varchar(20) NOT NULL,
  `student_roll_number` varchar(20) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `description` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `stipend` int DEFAULT NULL,
  `offer_letter` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`internship_id`),
  KEY `fk_student_roll_intern` (`student_roll_number`),
  CONSTRAINT `fk_student_roll_intern` FOREIGN KEY (`student_roll_number`) REFERENCES `students_data` (`roll_number`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internship_data`
--

LOCK TABLES `internship_data` WRITE;
/*!40000 ALTER TABLE `internship_data` DISABLE KEYS */;
INSERT INTO `internship_data` VALUES ('INT001','2023EE002','Power Electronics Corp','Summer Intern','3-month internship in power systems','2024-05-01','2024-07-31','Chicago',3000,'offer_letter_url',1),('INT002','2023CS003','Amazon','Software Intern','Backend development internship','2024-06-01','2024-08-31','Seattle',5000,'offer_letter_url2',1),('INT003','2023ME004','SpaceX','Engineering Intern','Rocket propulsion systems','2024-05-15','2024-08-15','Los Angeles',4500,'offer_letter_url3',1),('INT004','2023CS007','Meta','ML Intern','Machine learning research','2024-06-15','2024-09-15','Menlo Park',5500,'offer_letter_url4',1),('INT005','2023CE005','AECOM','Civil Engineering Intern','Infrastructure design','2024-05-01','2024-07-31','New York',3500,'offer_letter_url5',1),('INT006','2023CS010','Google','Data Science Intern','AI algorithm development','2024-06-01','2024-08-31','Mountain View',5000,'offer_letter_url6',1),('INT007','2023EE006','Siemens','Electrical Systems Intern','Power distribution systems','2024-05-15','2024-08-15','Orlando',3800,'offer_letter_url7',1),('INT008','2023ME008','General Motors','Mechanical Design Intern','Vehicle systems design','2024-06-15','2024-09-15','Detroit',4000,'offer_letter_url8',1),('INT009','2023CS015','Microsoft','Cloud Services Intern','Azure platform development','2024-05-01','2024-07-31','Redmond',5200,'offer_letter_url9',1),('INT010','2023CE009','Jacobs Engineering','Structural Analysis Intern','Building design analysis','2024-06-01','2024-08-31','Dallas',3300,'offer_letter_url10',1),('INT011','2023CS011','Netflix','UI/UX Intern','Streaming interface design','2024-05-15','2024-08-15','Los Gatos',5000,'offer_letter_url11',1),('INT012','2023EE012','Intel','Chip Design Intern','Processor architecture development','2024-06-15','2024-09-15','Santa Clara',4500,'offer_letter_url12',1),('INT013','2023ME013','Boeing','Aerospace Intern','Aircraft systems testing','2024-05-01','2024-07-31','Seattle',4200,'offer_letter_url13',1),('INT014','2023CS019','Salesforce','CRM Development Intern','Customer solution development','2024-06-01','2024-08-31','San Francisco',4800,'offer_letter_url14',1),('INT015','2023CE014','Fluor','Civil Project Intern','Construction project management','2024-05-15','2024-08-15','Irving',3400,'offer_letter_url15',1),('INT016','2023EE016','AMD','Hardware Testing Intern','Processor validation','2024-06-15','2024-09-15','Austin',4300,'offer_letter_url16',1),('INT017','2023CS021','Oracle','Database Intern','SQL optimization development','2024-05-01','2024-07-31','Austin',4700,'offer_letter_url17',1),('INT018','2023ME017','Tesla','Manufacturing Intern','Production system optimization','2024-06-01','2024-08-31','Fremont',4600,'offer_letter_url18',1),('INT019','2023CE018','Skanska','Construction Management Intern','Project coordination and planning','2024-05-15','2024-08-15','New York',3600,'offer_letter_url19',1),('INT020','2023CS024','IBM','Quantum Computing Intern','Quantum algorithm research','2024-06-15','2024-09-15','Yorktown Heights',4900,'offer_letter_url20',1);
/*!40000 ALTER TABLE `internship_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placements_data`
--

DROP TABLE IF EXISTS `placements_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placements_data` (
  `placement_id` varchar(20) NOT NULL,
  `student_roll_number` varchar(20) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `ctc` int DEFAULT NULL,
  `description` text,
  `joining_date` date DEFAULT NULL,
  `core` tinyint(1) DEFAULT NULL,
  `hiring_mode` varchar(20) DEFAULT NULL,
  `offer_letter` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`placement_id`),
  KEY `fk_student_roll_place` (`student_roll_number`),
  CONSTRAINT `fk_student_roll_place` FOREIGN KEY (`student_roll_number`) REFERENCES `students_data` (`roll_number`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placements_data`
--

LOCK TABLES `placements_data` WRITE;
/*!40000 ALTER TABLE `placements_data` DISABLE KEYS */;
INSERT INTO `placements_data` VALUES ('PL001','2023CS001','Tech Solutions Inc.','San Francisco','Software Engineer',120000,'Full-time software engineering position','2024-07-01',1,'Remote','offer_letter_url',1),('PL002','2023CS003','Google','Mountain View','Software Developer',150000,'Full-stack development role','2024-08-01',1,'Hybrid','offer_letter_url2',1),('PL003','2023EE002','Tesla','Austin','Electrical Engineer',110000,'Power systems engineering','2024-07-15',1,'On-site','offer_letter_url3',1),('PL004','2023ME004','Boeing','Seattle','Mechanical Engineer',95000,'Aerospace engineering position','2024-09-01',1,'On-site','offer_letter_url4',1),('PL005','2023CS007','Microsoft','Redmond','Software Engineer',135000,'Cloud platform development','2024-08-15',1,'Hybrid','offer_letter_url5',1),('PL006','2023CS011','Amazon','Seattle','Backend Engineer',140000,'AWS cloud services development','2024-07-10',0,'Hybrid','offer_letter_url6',1),('PL007','2023EE012','Intel','Santa Clara','Hardware Engineer',105000,'Semiconductor design','2024-08-01',1,'On-site','offer_letter_url7',1),('PL008','2023CS015','Oracle','Austin','Database Engineer',125000,'Cloud infrastructure role','2024-09-15',0,'Hybrid','offer_letter_url8',1),('PL009','2023ME013','General Electric','Boston','Design Engineer',90000,'Mechanical systems design','2024-07-01',1,'On-site','offer_letter_url9',1),('PL010','2023CS019','Adobe','San Jose','Front-end Developer',130000,'User experience engineering','2024-08-01',0,'Remote','offer_letter_url10',1),('PL011','2023EE016','Qualcomm','San Diego','Electrical Design Engineer',115000,'Mobile chip design','2024-07-15',1,'On-site','offer_letter_url11',1),('PL012','2023CE014','AECOM','Los Angeles','Structural Engineer',85000,'Building design and analysis','2024-09-01',1,'Hybrid','offer_letter_url12',1),('PL013','2023CS010','Salesforce','San Francisco','Developer',145000,'CRM system development','2024-08-15',0,'Remote','offer_letter_url13',1),('PL014','2023ME017','SpaceX','Hawthorne','Propulsion Engineer',110000,'Rocket engine design','2024-07-01',1,'On-site','offer_letter_url14',1),('PL015','2023CS021','IBM','Austin','Cloud Engineer',125000,'Enterprise cloud solutions','2024-08-01',0,'Hybrid','offer_letter_url15',1),('PL016','2023EE006','Nvidia','Santa Clara','GPU Engineer',135000,'GPU architecture design','2024-09-15',1,'On-site','offer_letter_url16',1),('PL017','2023ME022','Ford','Detroit','Automotive Engineer',95000,'Drivetrain systems design','2024-07-15',1,'On-site','offer_letter_url17',1),('PL018','2023CS024','Twitter','San Francisco','Backend Engineer',130000,'Distributed systems development','2024-08-01',0,'Hybrid','offer_letter_url18',1),('PL019','2023EE025','Samsung','San Jose','Electronics Engineer',115000,'Consumer electronics design','2024-07-01',1,'On-site','offer_letter_url19',1),('PL020','2023CE018','Bechtel','Reston','Civil Engineer',90000,'Infrastructure project engineering','2024-09-01',1,'Hybrid','offer_letter_url20',1);
/*!40000 ALTER TABLE `placements_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_papers`
--

DROP TABLE IF EXISTS `research_papers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_papers` (
  `paper_id` varchar(10) NOT NULL,
  `student_roll_number` varchar(20) DEFAULT NULL,
  `title` text,
  `authors` text,
  `affiliations` text,
  `orcid_id` varchar(30) DEFAULT NULL,
  `abstract` text,
  `intro` text,
  `review` text,
  `methodology` text,
  `result` text,
  `discussion` text,
  `conclusions` text,
  `journal_name` text,
  `volume_issue` varchar(20) DEFAULT NULL,
  `doi` varchar(50) DEFAULT NULL,
  `license` varchar(50) DEFAULT NULL,
  `bibliography` text,
  `approved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`paper_id`),
  KEY `fk_student_roll_re` (`student_roll_number`),
  CONSTRAINT `fk_student_roll_re` FOREIGN KEY (`student_roll_number`) REFERENCES `students_data` (`roll_number`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_papers`
--

LOCK TABLES `research_papers` WRITE;
/*!40000 ALTER TABLE `research_papers` DISABLE KEYS */;
INSERT INTO `research_papers` VALUES ('RP001','2023CS001','Machine Learning in Education','Alex Johnson/Dr. Sarah Williams','University Computer Science Department','0000-0001-2345-6789','A study on implementing ML in educational systems','This paper explores innovative applications of machine learning algorithms to enhance educational outcomes and personalize learning experiences.','Peer-reviewed and accepted','Qualitative and quantitative analysis','Positive correlation found','Implications for future educational systems','ML shows promising results in education','Journal of Educational Technology','Vol. 15/Issue 3','10.1234/jet.2024.001','CC BY-NC-ND 4.0','Harvard style references',1),('RP002','2023CS003','Blockchain in Healthcare','John Smith/Dr. Emily Martinez','University Computer Science Department','0000-0001-3456-7890','Implementation of blockchain in healthcare records','This research introduces a novel blockchain framework designed to strengthen healthcare data security while improving accessibility for authorized medical professionals.','Under review','Case study analysis','Improved security metrics','Future of healthcare data','Blockchain enhances security','Journal of Healthcare Informatics','Vol. 8/Issue 2','10.1234/jhi.2024.002','CC BY 4.0','APA style references',1),('RP003','2023EE002','Renewable Energy Systems','Emma Davis/Dr. Michael Brown','University Electrical Engineering Department','0000-0001-4567-8901','Smart grid integration with renewable sources','This paper presents comprehensive analysis of integration techniques for renewable energy sources within smart grid infrastructure to maximize efficiency and reliability.','Accepted with revisions','Experimental research','Efficiency improvement','Cost-benefit analysis','Viable for implementation','Renewable Energy Journal','Vol. 20/Issue 4','10.1234/rej.2024.003','MIT License','IEEE style references',1),('RP004','2023CS007','Quantum Computing Applications','David Kim/Dr. Sarah Williams','University Computer Science Department','0000-0001-5678-9012','Quantum algorithms for optimization problems','Our research demonstrates breakthrough applications of quantum algorithms to solve complex optimization problems that are intractable for classical computing systems.','Peer-reviewed and accepted','Simulation and theoretical analysis','Performance gains demonstrated','Quantum supremacy implications','Quantum computing shows promise for NP-hard problems','Quantum Information Processing','Vol. 12/Issue 2','10.1234/qip.2024.004','CC BY 4.0','APA style references',1),('RP005','2023ME004','Advanced Materials in Aerospace','Sarah Chen/Dr. James Wilson','University Mechanical Engineering Department','0000-0001-6789-0123','Composite materials for aircraft structures','This study introduces next-generation composite materials specifically engineered for critical aerospace applications with unprecedented strength-to-weight ratios.','Accepted with minor revisions','Experimental testing and analysis','Improved strength-to-weight ratio','Applications in commercial aviation','New composites reduce aircraft weight by 15%','Journal of Aerospace Engineering','Vol. 35/Issue 1','10.1234/jae.2024.005','CC BY-NC-SA 4.0','Chicago style references',1),('RP006','2023CS010','Natural Language Processing Advances','Maria Garcia/Dr. Patricia Lee','University Computer Science Department','0000-0001-7890-1234','Transformer models for multilingual translation','Our research introduces an enhanced transformer architecture that significantly improves multilingual translation capabilities across diverse language families.','Peer-reviewed and accepted','Comparative analysis','State-of-the-art translation quality','Multilingual model efficiency','Transformer architecture outperforms previous methods','Computational Linguistics Journal','Vol. 48/Issue 3','10.1234/cl.2024.006','CC BY 4.0','IEEE style references',1),('RP007','2023EE006','Power Grid Optimization','Lisa Wong/Dr. Michael Brown','University Electrical Engineering Department','0000-0001-8901-2345','AI-based load balancing in smart grids','This paper presents an innovative artificial intelligence framework for dynamic load balancing in next-generation smart grid systems to prevent outages.','Under review','Simulation and field testing','Reduced power outages','Energy efficiency improvements','Smart grid implementation reduces failures by 30%','IEEE Transactions on Power Systems','Vol. 39/Issue 2','10.1234/tps.2024.007','CC BY-NC-ND 4.0','IEEE style references',1),('RP008','2023CE005','Sustainable Construction Materials','Michael Brown/Dr. Emily Martinez','University Civil Engineering Department','0000-0001-9012-3456','Recycled concrete aggregates in structural applications','This research investigates the structural viability of recycled concrete aggregates as a sustainable alternative to traditional materials in construction projects.','Accepted with revisions','Experimental testing','Comparable strength metrics','Environmental impact reduction','Recycled aggregates viable for non-critical structures','Journal of Building Engineering','Vol. 15/Issue 4','10.1234/jbe.2024.008','CC BY 4.0','APA style references',1),('RP009','2023CS011','Deep Learning for Medical Imaging','Kevin Patel/Dr. Robert Taylor','University Computer Science Department','0000-0002-0123-4567','Neural networks for early cancer detection','This study presents a groundbreaking convolutional neural network architecture specifically optimized for early-stage cancer detection in medical imaging.','Peer-reviewed and accepted','Clinical data analysis','Improved detection accuracy','Healthcare implementation challenges','Deep learning improves diagnosis accuracy by 18%','Medical Image Analysis','Vol. 25/Issue 2','10.1234/mia.2024.009','CC BY-NC-SA 4.0','Vancouver style references',1),('RP010','2023ME008','Robotics in Manufacturing','Rachel Green/Dr. James Wilson','University Mechanical Engineering Department','0000-0002-1234-5678','Collaborative robots in assembly lines','This paper introduces an advanced collaborative robotics framework designed to revolutionize manufacturing assembly processes while ensuring worker safety.','Accepted with minor revisions','Case studies and implementation','Productivity improvements','Human-robot collaboration','Collaborative robots increase efficiency by 25%','Journal of Manufacturing Systems','Vol. 60/Issue 1','10.1234/jms.2024.010','MIT License','Chicago style references',1);
/*!40000 ALTER TABLE `research_papers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `societies_clubs`
--

DROP TABLE IF EXISTS `societies_clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `societies_clubs` (
  `club_id` varchar(20) NOT NULL,
  `student_roll_number` varchar(20) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `membership_type` varchar(50) DEFAULT NULL,
  `description` text,
  `proof` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`club_id`),
  KEY `fk_student_roll_sport` (`student_roll_number`),
  CONSTRAINT `fk_student_roll_sport` FOREIGN KEY (`student_roll_number`) REFERENCES `students_data` (`roll_number`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `societies_clubs`
--

LOCK TABLES `societies_clubs` WRITE;
/*!40000 ALTER TABLE `societies_clubs` DISABLE KEYS */;
INSERT INTO `societies_clubs` VALUES ('CLB001','2023CS001','Technical','Coding Club','President','Club focused on competitive programming','certificate_url1',1),('CLB002','2023EE002','Cultural','Music Society','Member','University music ensemble','performance_video_url1',1),('CLB003','2023ME004','Sports','Athletics Club','Vice President','Track and field activities','team_photo_url1',1),('CLB004','2023CS003','Technical','AI Research Group','Secretary','Advanced AI/ML research group','project_demo_url1',1),('CLB005','2023CE005','Professional','Civil Engineering Society','Treasurer','Professional development society','membership_card_url1',1),('CLB006','2023CS007','Technical','Cybersecurity Club','President','Network security and ethical hacking group','competition_certificate_url1',1),('CLB007','2023EE006','Professional','IEEE Student Branch','Secretary','Electrical engineering professional chapter','membership_certificate_url1',1),('CLB008','2023ME008','Cultural','Dance Troupe','Member','Contemporary and classical dance group','recital_video_url1',1),('CLB009','2023CS010','Technical','Game Development Club','Treasurer','Video game design and development','game_demo_url1',1),('CLB010','2023CE009','Service','Community Outreach','Vice President','Social service and volunteering club','service_hours_document_url1',1),('CLB011','2023CS011','Technical','Robotics Club','President','Robotics design and competitions','robot_showcase_url1',1),('CLB012','2023EE012','Cultural','Photography Club','Member','Photography and visual arts society','portfolio_url1',1),('CLB013','2023ME013','Professional','ASME Chapter','Secretary','Mechanical engineering association','member_id_url1',1),('CLB014','2023CS015','Technical','Web Development Club','Treasurer','Web technologies and development group','website_project_url1',1),('CLB015','2023CE014','Environmental','Sustainability Club','President','Environmental awareness and campus initiatives','project_report_url1',1),('CLB016','2023CS019','Technical','Blockchain Society','Vice President','Cryptocurrency and blockchain technology group','project_documentation_url1',1),('CLB017','2023EE016','Sports','Badminton Club','Member','University badminton team','tournament_photo_url1',1),('CLB018','2023ME017','Cultural','Drama Society','Secretary','Theatrical performances and workshops','performance_program_url1',1),('CLB019','2023CS021','Technical','Data Science Club','Treasurer','Data analytics and visualization group','data_project_url1',1),('CLB020','2023CE018','Professional','Civil Engineering Association','Member','Industry networking and professional development','event_participation_url1',1),('CLB021','2023CS024','Technical','Open Source Club','President','Open source software contribution group','github_contributions_url1',1),('CLB022','2023EE025','Cultural','Film Society','Vice President','Film appreciation and short film making','short_film_url1',1),('CLB023','2023ME022','Sports','Swimming Club','Secretary','University swimming team','meet_results_url1',1),('CLB024','2023CS007','Technical','IoT Club','Member','Internet of things projects and workshops','project_demonstration_url1',1),('CLB025','2023CE023','Service','Campus Ambassadors','Treasurer','University representation and outreach program','ambassador_badge_url1',1);
/*!40000 ALTER TABLE `societies_clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports_events`
--

DROP TABLE IF EXISTS `sports_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sports_events` (
  `sport_id` varchar(20) NOT NULL,
  `student_roll_number` varchar(20) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `participation_type` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `awards` varchar(100) DEFAULT NULL,
  `description` text,
  `proof` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`sport_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports_events`
--

LOCK TABLES `sports_events` WRITE;
/*!40000 ALTER TABLE `sports_events` DISABLE KEYS */;
INSERT INTO `sports_events` VALUES ('SPT001','2023EE002','Basketball','Team Captain','University Sports Complex','2024-02-20','Tournament Winners','Inter-university basketball championship','trophy_photo_url',1),('SPT002','2023ME004','Athletics','Individual Participant','Olympic Stadium','2024-03-10','Gold Medal','100m Sprint Competition','medal_photo_url',1),('SPT003','2023CS001','Cricket','Team Member','University Cricket Ground','2024-04-15','Runner Up','Inter-college tournament','certificate_url',1),('SPT004','2023CE005','Football','Team Captain','Main Stadium','2024-05-01','Best Player','Annual Sports Meet','trophy_photo_url2',1),('SPT005','2023CS003','Table Tennis','Singles Player','Indoor Sports Hall','2024-03-25','Champion','State Level Competition','medal_photo_url2',1),('SPT006','2023EE006','Volleyball','Team Member','Beach Volleyball Court','2024-02-15','Runner Up','Inter-university tournament','certificate_url2',1),('SPT007','2023ME008','Swimming','Individual Participant','Aquatic Center','2024-03-05','Gold Medal','200m Freestyle Competition','medal_photo_url3',1),('SPT008','2023CS007','Badminton','Doubles Player','Badminton Courts','2024-04-10','Champions','Doubles Tournament','trophy_photo_url3',1),('SPT009','2023CE009','Tennis','Singles Player','Tennis Stadium','2024-05-15','Semi-finalist','University Open Tournament','certificate_url3',1),('SPT010','2023CS010','Chess','Individual Participant','Mind Sports Hall','2024-03-20','Champion','Chess Championship','trophy_photo_url4',1),('SPT011','2023EE012','Hockey','Team Captain','Hockey Field','2024-02-25','Tournament Winners','Regional Hockey League','trophy_photo_url5',1),('SPT012','2023ME013','Gymnastics','Individual Participant','Gymnastics Arena','2024-03-15','Silver Medal','Artistic Gymnastics Competition','medal_photo_url4',1),('SPT013','2023CS011','Basketball','Team Member','University Sports Complex','2024-04-20','Third Place','Inter-department tournament','certificate_url4',1),('SPT014','2023CE014','Rugby','Team Captain','Rugby Field','2024-05-10','Best Team','University Rugby Cup','trophy_photo_url6',1),('SPT015','2023CS015','Squash','Singles Player','Squash Courts','2024-03-30','Champion','National Level Competition','medal_photo_url5',1),('SPT016','2023EE016','Cricket','Team Member','University Cricket Ground','2024-02-10','Tournament Winners','T20 University Challenge','certificate_url5',1),('SPT017','2023ME017','Athletics','Individual Participant','Olympic Stadium','2024-03-01','Bronze Medal','Long Jump Competition','medal_photo_url6',1),('SPT018','2023CS019','Football','Team Member','Main Stadium','2024-04-25','Runner Up','Inter-university tournament','certificate_url6',1),('SPT019','2023CE018','Swimming','Individual Participant','Aquatic Center','2024-05-20','Gold Medal','100m Butterfly Competition','medal_photo_url7',1),('SPT020','2023CS021','Table Tennis','Doubles Player','Indoor Sports Hall','2024-03-10','Champions','Doubles Championship','trophy_photo_url7',1);
/*!40000 ALTER TABLE `sports_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students_data`
--

DROP TABLE IF EXISTS `students_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students_data` (
  `roll_number` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `department` varchar(50) NOT NULL,
  `section` char(1) NOT NULL,
  `FA` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`roll_number`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students_data`
--

LOCK TABLES `students_data` WRITE;
/*!40000 ALTER TABLE `students_data` DISABLE KEYS */;
INSERT INTO `students_data` VALUES ('2023CE005','Michael Brown','Civil Engineering','B','Dr. Emily Martinez','michael.b@university.edu','hashedPassword102'),('2023CE009','Thomas Anderson','Civil Engineering','C','Dr. Emily Martinez','thomas.a@university.edu','hashedPassword106'),('2023CE014','Sophia Lee','Civil Engineering','B','Dr. Emily Martinez','sophia.l@university.edu','hashedPassword111'),('2023CE018','Emily Johnson','Civil Engineering','C','Dr. Emily Martinez','emily.j@university.edu','hashedPassword115'),('2023CE023','William Davis','Civil Engineering','B','Dr. Jennifer White','william.d@university.edu','hashedPassword120'),('2023CS001','Alex Johnson','Computer Science','A','Dr. Sarah Williams','alex.j@university.edu','hashedPassword123'),('2023CS003','John Smith','Computer Science','A','Dr. Sarah Williams','john.s@university.edu','hashedPassword789'),('2023CS007','David Kim','Computer Science','B','Dr. Sarah Williams','david.k@university.edu','hashedPassword104'),('2023CS010','Maria Garcia','Computer Science','A','Dr. Sarah Williams','maria.g@university.edu','hashedPassword107'),('2023CS011','Kevin Patel','Computer Science','B','Dr. Robert Taylor','kevin.p@university.edu','hashedPassword108'),('2023CS015','James Wilson','Computer Science','C','Dr. Patricia Lee','james.w@university.edu','hashedPassword112'),('2023CS019','Benjamin Taylor','Computer Science','A','Dr. Patricia Lee','benjamin.t@university.edu','hashedPassword116'),('2023CS021','Christopher Lee','Computer Science','C','Dr. Robert Taylor','chris.l@university.edu','hashedPassword118'),('2023CS024','Ava Wilson','Computer Science','C','Dr. Patricia Lee','ava.w@university.edu','hashedPassword121'),('2023EE002','Emma Davis','Electrical Engineering','B','Dr. Michael Brown','emma.d@university.edu','hashedPassword456'),('2023EE006','Lisa Wong','Electrical Engineering','A','Dr. Michael Brown','lisa.w@university.edu','hashedPassword103'),('2023EE012','Jessica Zhang','Electrical Engineering','C','Dr. Michael Brown','jessica.z@university.edu','hashedPassword109'),('2023EE016','Olivia Martinez','Electrical Engineering','A','Dr. Michael Brown','olivia.m@university.edu','hashedPassword113'),('2023EE020','Natalie Kim','Electrical Engineering','B','Dr. Jennifer White','natalie.k@university.edu','hashedPassword117'),('2023EE025','Ethan Garcia','Electrical Engineering','A','Dr. Michael Brown','ethan.g@university.edu','hashedPassword122'),('2023ME004','Sarah Chen','Mechanical Engineering','C','Dr. James Wilson','sarah.c@university.edu','hashedPassword101'),('2023ME008','Rachel Green','Mechanical Engineering','A','Dr. James Wilson','rachel.g@university.edu','hashedPassword105'),('2023ME013','Daniel Rodriguez','Mechanical Engineering','A','Dr. James Wilson','daniel.r@university.edu','hashedPassword110'),('2023ME017','Ryan Chen','Mechanical Engineering','B','Dr. Thomas Moore','ryan.c@university.edu','hashedPassword114'),('2023ME022','Isabella Brown','Mechanical Engineering','A','Dr. Thomas Moore','isabella.b@university.edu','hashedPassword119');
/*!40000 ALTER TABLE `students_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `technical_events_data`
--

DROP TABLE IF EXISTS `technical_events_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `technical_events_data` (
  `event_id` varchar(20) NOT NULL,
  `student_roll_number` varchar(20) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `awards` varchar(100) DEFAULT NULL,
  `description` text,
  `proof` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `fk_student_roll` (`student_roll_number`),
  CONSTRAINT `fk_student_roll` FOREIGN KEY (`student_roll_number`) REFERENCES `students_data` (`roll_number`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `technical_events_data`
--

LOCK TABLES `technical_events_data` WRITE;
/*!40000 ALTER TABLE `technical_events_data` DISABLE KEYS */;
INSERT INTO `technical_events_data` VALUES ('TECH001','2023CS001','Hackathon','CodeFest 2024','2024-03-15','University Main Hall','First Place','24-hour coding competition','certificate_url',1),('TECH002','2023CS003','AI Competition','AI Summit 2024','2024-04-20','Innovation Center','Best Innovation','AI model competition','certificate_url2',1),('TECH003','2023EE002','Robotics','RoboWars 2024','2024-05-10','Engineering Block','Runner Up','Robot battle competition','certificate_url3',1),('TECH004','2023CS007','Cybersecurity','SecureHack 2024','2024-06-01','Tech Center','Third Place','Security hackathon','certificate_url4',1),('TECH005','2023ME004','CAD Competition','DesignPro 2024','2024-03-30','Design Lab','Best Design','3D modeling competition','certificate_url5',1),('TECH006','2023CS010','Web Development','WebDev Challenge','2024-04-15','Computer Science Building','First Place','Responsive web design competition','certificate_url6',1),('TECH007','2023EE006','Circuit Design','CircuitCon 2024','2024-05-20','Electronics Lab','Best Innovation','Electronic circuit design contest','certificate_url7',1),('TECH008','2023CS011','Data Science','DataHack 2024','2024-06-10','Analytics Center','Runner Up','Data analysis and visualization challenge','certificate_url8',1),('TECH009','2023ME008','3D Printing','MakerFest 2024','2024-03-25','Mechanical Workshop','Best Prototype','Rapid prototyping competition','certificate_url9',1),('TECH010','2023CE005','Structural Design','BuildTech 2024','2024-04-30','Civil Engineering Department','First Place','Structural modeling competition','certificate_url10',1),('TECH011','2023CS015','Mobile App Development','AppDev 2024','2024-05-15','Innovation Hub','Best UI/UX','Mobile application development challenge','certificate_url11',1),('TECH012','2023EE012','IoT Competition','IoTathon 2024','2024-06-05','Smart Systems Lab','Runner Up','Internet of Things solution development','certificate_url12',1),('TECH013','2023CS019','Game Development','GameJam 2024','2024-03-20','Digital Media Center','Best Game Design','48-hour game creation challenge','certificate_url13',1),('TECH014','2023ME013','Drone Competition','DroneFest 2024','2024-04-25','Aeronautics Lab','First Place','Autonomous drone navigation contest','certificate_url14',1),('TECH015','2023CS021','Blockchain','BlockHack 2024','2024-05-25','Cryptocurrency Lab','Best Implementation','Blockchain solution development','certificate_url15',1),('TECH016','2023EE016','Renewable Energy','GreenTech 2024','2024-06-15','Energy Research Center','Innovation Award','Sustainable energy solutions challenge','certificate_url16',1),('TECH017','2023CS024','Cloud Computing','CloudExpo 2024','2024-03-10','Server Room','Best Architecture','Cloud-based application development','certificate_url17',1),('TECH018','2023ME017','Automotive Design','AutoTech 2024','2024-04-05','Vehicle Lab','Best Design','Vehicle design and simulation competition','certificate_url18',1),('TECH019','2023CS007','Quantum Computing','QuantumByte 2024','2024-05-05','Quantum Center','Best Research','Quantum algorithm development challenge','certificate_url19',1),('TECH020','2023EE025','Embedded Systems','EmbeddedCon 2024','2024-06-20','Microcontroller Lab','First Place','Embedded system design competition','certificate_url20',1);
/*!40000 ALTER TABLE `technical_events_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-24 22:06:35
