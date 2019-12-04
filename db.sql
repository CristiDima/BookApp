-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bsdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bsdb
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `bsdb` DEFAULT CHARACTER SET utf8 ;
USE `bsdb` ;

-- -----------------------------------------------------
-- Table `bsdb`.`Address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsdb`.`Address` (
  `id` INT NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `number` INT NULL,
  `city` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
  
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsdb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsdb`.`UsersBookster` (
  `id` INT NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `addressId` INT NULL,
  `isAdmin` boolean NOT NULL,
  PRIMARY KEY (`id`),
	FOREIGN KEY (addressId) REFERENCES Address(id))

ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsdb`.`Authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsdb`.`Authors` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`))

ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsdb`.`Types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsdb`.`BooksType` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(1045) NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsdb`.`Books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsdb`.`Books` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `authorId` INT NOT NULL,
  `typeId` INT NOT NULL,
  `description` VARCHAR(1000) NULL,
  `rating` DOUBLE NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (authorId) REFERENCES Authors(id),
  FOREIGN KEY (typeId) REFERENCES BooksType(id))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsdb`.`LoanedBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsdb`.`LoanedBooks` (
  `id` INT NOT NULL,
  `userId` INT NULL,
  `bookId` INT NULL,
  `dateToReturn` DATE NULL,
  PRIMARY KEY (`id`),
   FOREIGN KEY (userId) REFERENCES Users(id),
  FOREIGN KEY (bookId) REFERENCES Books(id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsdb`.`UserAccount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsdb`.`UserAccount` (
  `id` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isValid` boolean NULL,
  `expirationDate` date NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (userId) REFERENCES Users(id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bsdb`.`ReadBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bsdb`.`ReadBooks` (
  `id` INT NOT NULL,
  `bookId` INT NOT NULL,
  `userId` INT NOT NULL,
  `readPages` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (bookId) REFERENCES Books(id),
  FOREIGN KEY (userId) REFERENCES Users(id))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
