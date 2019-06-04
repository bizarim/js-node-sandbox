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
-- 테이블 maindb.configShardDB 구조 내보내기
CREATE TABLE IF NOT EXISTS `configShardDB` (
  `dbIdx` smallint(6) NOT NULL COMMENT 'db 아이디',
  `userCnt` int(11) NOT NULL DEFAULT '0' COMMENT '유저 카운팅',
  `used` tinyint(4) NOT NULL DEFAULT '0' COMMENT '사용여부',
  `dbGameConnStr` varchar(240) NOT NULL COMMENT '게임 db 연결 정보',
  `dbLogConnStr` varchar(240) NOT NULL COMMENT '로그 db 연결 정보',
  PRIMARY KEY (`dbIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
