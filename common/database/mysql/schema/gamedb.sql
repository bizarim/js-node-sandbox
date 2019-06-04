-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        5.7.25 - MySQL Community Server (GPL)
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 gamedb01.tUserInfo 구조 내보내기
CREATE TABLE IF NOT EXISTS `test` (
  `rowIdx` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '행번호',
  `accIdx` bigint(20) NOT NULL COMMENT '계정번호',
  PRIMARY KEY (`rowIdx`),
  KEY `IX_userinfo_accidx` (`accIdx`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
