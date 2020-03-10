-- -----------------------------------------------------
-- Table `cdlstore`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`address` (
  `id` INT NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `number` INT NULL,
  `city` VARCHAR(45) NULL,
  `district` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `cdlstore`.`user_bookstore`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`userBookstore` (
  `id` INT NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `addressId` INT NULL,
  `admin` boolean NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (addressId) REFERENCES address(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`Authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`author` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `cdlstore`.`Types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`bookType` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(1045) NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `cdlstore`.`Books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`book` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `authorId` INT NOT NULL,
  `typeId` INT NOT NULL,
  `description` VARCHAR(1000) NULL,
  `rating` DOUBLE NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (authorId) REFERENCES author(id),
  FOREIGN KEY (typeId) REFERENCES bookType(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`LoanedBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`loanedBooks` (
  `id` INT NOT NULL,
  `userId` INT NULL,
  `bookId` INT NULL,
  `dateToReturn` DATE NULL,
  PRIMARY KEY (`id`),
   FOREIGN KEY (userId) REFERENCES userBookstore(id),
  FOREIGN KEY (bookId) REFERENCES book(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`UserAccount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`userAccount` (
  `id` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isValid` boolean NULL,
  `expirationDate` date NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (userId) REFERENCES userBookstore(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`ReadBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`readBooks` (
  `id` INT NOT NULL,
  `bookId` INT NOT NULL,
  `userId` INT NOT NULL,
  `readPages` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (bookId) REFERENCES book(id),
  FOREIGN KEY (userid) REFERENCES userBookstore(id));

-- --------------------------------------------------------
-- Initial inserts into db
-- --------------------------------------------------------
INSERT INTO address(`id`, `street`, `number`, `city`, `district`) VALUES  (1, 'George Enescu', 1, 'Craiova', 'Dolj');

INSERT INTO userBookstore(`id`, `firstName`, `lastName`, `addressId`, `admin`) VALUES  (1, 'Cristian', 'Dima', 1, true);

INSERT INTO userAccount(`id`, `email`, `password`, `isValid`, `expirationDate`, `userId`) VALUES  (1, 'cristiandima30@gmail.com', 'testpass', true, null, 1);