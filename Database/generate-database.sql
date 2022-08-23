-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ArUHere
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ArUHere` ;

-- -----------------------------------------------------
-- Schema ArUHere
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ArUHere` ;
USE `ArUHere` ;

-- -----------------------------------------------------
-- Table `ArUHere`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER` (
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(16) NOT NULL,
  `activityMessage` VARCHAR(120) NULL,
  `password` BINARY(255) NOT NULL,
  `role` ENUM("admin", "professor", "student") NOT NULL DEFAULT 'student',
  `address` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `isVerified` TINYINT NOT NULL DEFAULT 0,
  `isBlackListed` TINYINT NOT NULL DEFAULT 0,
  `isConnected` TINYINT NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_LOGO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_LOGO` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_LOGO` (
  `path` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `seed` INT NOT NULL,
  `sizeMo` INT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 0,
  `userUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_USER_LOGO_1_idx` (`userUuid` ASC) VISIBLE,
  CONSTRAINT `fk_USER_LOGO_1`
    FOREIGN KEY (`userUuid`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_IP`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_IP` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_IP` (
  `ip` VARCHAR(16) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NOT NULL DEFAULT 0,
  `userUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_USER_IP_1_idx` (`userUuid` ASC) VISIBLE,
  UNIQUE INDEX `ip_UNIQUE` (`ip` ASC) VISIBLE,
  CONSTRAINT `fk_USER_IP_1`
    FOREIGN KEY (`userUuid`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_MACADDRESS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_MACADDRESS` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_MACADDRESS` (
  `macAddress` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NOT NULL DEFAULT 0,
  `userUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_USER_MACADDRESS_1_idx` (`userUuid` ASC) VISIBLE,
  UNIQUE INDEX `macAddress_UNIQUE` (`macAddress` ASC) VISIBLE,
  CONSTRAINT `fk_USER_MACADDRESS_1`
    FOREIGN KEY (`userUuid`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_DEVICE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_DEVICE` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_DEVICE` (
  `device` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NOT NULL DEFAULT 0,
  `userUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  INDEX `fk_USER_DEVICE_1_idx` (`userUuid` ASC) VISIBLE,
  CONSTRAINT `fk_USER_DEVICE_1`
    FOREIGN KEY (`userUuid`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_HISTORY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_HISTORY` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_HISTORY` (
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isMessage` TINYINT NOT NULL DEFAULT 0,
  `isAction` TINYINT NOT NULL DEFAULT 0,
  `userUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_USER_HISTORY_1_idx` (`userUuid` ASC) VISIBLE,
  CONSTRAINT `fk_USER_HISTORY_1`
    FOREIGN KEY (`userUuid`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_ACTION`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_ACTION` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_ACTION` (
  `log` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userHistoryUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_USER_ACTION_1_idx` (`userHistoryUuid` ASC) VISIBLE,
  CONSTRAINT `fk_USER_ACTION_1`
    FOREIGN KEY (`userHistoryUuid`)
    REFERENCES `ArUHere`.`USER_HISTORY` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_REPORT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_REPORT` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_REPORT` (
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reason` TEXT NOT NULL,
  `userSendReport` BINARY(16) NOT NULL,
  `userReported` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_USER_REPORT_1_idx` (`userSendReport` ASC) VISIBLE,
  INDEX `fk_USER_REPORT_2_idx` (`userReported` ASC) VISIBLE,
  CONSTRAINT `fk_USER_REPORT_1`
    FOREIGN KEY (`userSendReport`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USER_REPORT_2`
    FOREIGN KEY (`userReported`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_TOKEN`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_TOKEN` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_TOKEN` (
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expireAt` DATETIME NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `userUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC) VISIBLE,
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_USER_TOKEN_1_idx` (`userUuid` ASC) VISIBLE,
  UNIQUE INDEX `userUuid_UNIQUE` (`userUuid` ASC) VISIBLE,
  CONSTRAINT `fk_USER_TOKEN_1`
    FOREIGN KEY (`userUuid`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`ACTIVITY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`ACTIVITY` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`ACTIVITY` (
  `activityKey` VARCHAR(45) NOT NULL,
  `name` VARCHAR(30) NULL,
  `description` VARCHAR(255) NULL,
  `startTime` DATETIME NULL,
  `endTime` DATETIME NULL,
  `studyLevel` VARCHAR(50) NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  UNIQUE INDEX `activityKey_UNIQUE` (`activityKey` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`ACTIVITY_USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`ACTIVITY_USER` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`ACTIVITY_USER` (
  `userUuid` BINARY(16) NOT NULL,
  `activityUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_activity_user_activity_idx` (`activityUuid` ASC) VISIBLE,
  INDEX `fk_activity_user_userName_idx` (`userUuid` ASC) VISIBLE,
  CONSTRAINT `fk_activity_user_activity`
    FOREIGN KEY (`activityUuid`)
    REFERENCES `ArUHere`.`ACTIVITY` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_activity_user_userName`
    FOREIGN KEY (`userUuid`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`ABSENCE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`ABSENCE` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`ABSENCE` (
  `justification` VARCHAR(255) NULL,
  `acceptedJustification` TINYINT NULL,
  `activityUserUuid` BINARY(16) NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_absence_activityuser_idx` (`activityUserUuid` ASC) VISIBLE,
  CONSTRAINT `fk_absence_activityuser`
    FOREIGN KEY (`activityUserUuid`)
    REFERENCES `ArUHere`.`ACTIVITY_USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`DELAY`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`DELAY` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`DELAY` (
  `delayInMinutes` SMALLINT NULL,
  `justification` VARCHAR(255) NULL,
  `acceptedJustification` TINYINT NULL,
  `activityUserUuid` BINARY(16) NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE,
  INDEX `fk_delay_activityuser_idx` (`activityUserUuid` ASC) VISIBLE,
  CONSTRAINT `fk_delay_activityuser`
    FOREIGN KEY (`activityUserUuid`)
    REFERENCES `ArUHere`.`ACTIVITY_USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ArUHere`.`USER_FACE_ID`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ArUHere`.`USER_FACE_ID` ;

CREATE TABLE IF NOT EXISTS `ArUHere`.`USER_FACE_ID` (
  `path` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userUuid` BINARY(16) NOT NULL,
  `uuid` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID(), TRUE)),
  PRIMARY KEY (`uuid`),
  INDEX `fk_faceId_userUuid_idx` (`userUuid` ASC) VISIBLE,
  CONSTRAINT `fk_faceId_userUuid`
    FOREIGN KEY (`userUuid`)
    REFERENCES `ArUHere`.`USER` (`uuid`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
