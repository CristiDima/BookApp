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
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_bookstore` (
  `id` INT NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `addressId` INT NULL,
  `isAdmin` boolean NOT NULL,
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
CREATE TABLE IF NOT EXISTS `cdlstore`.`book_type` (
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
  FOREIGN KEY (typeId) REFERENCES book_type(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`LoanedBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`loaned_books` (
  `id` INT NOT NULL,
  `userId` INT NULL,
  `bookId` INT NULL,
  `dateToReturn` DATE NULL,
  PRIMARY KEY (`id`),
   FOREIGN KEY (userId) REFERENCES user_bookstore(id),
  FOREIGN KEY (bookId) REFERENCES book(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`UserAccount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_account` (
  `id` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `isValid` boolean NULL,
  `expirationDate` date NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (userId) REFERENCES user_bookstore(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`ReadBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`read_books` (
  `id` INT NOT NULL,
  `bookId` INT NOT NULL,
  `userId` INT NOT NULL,
  `readPages` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (bookId) REFERENCES book(id),
  FOREIGN KEY (userId) REFERENCES user_bookstore(id));