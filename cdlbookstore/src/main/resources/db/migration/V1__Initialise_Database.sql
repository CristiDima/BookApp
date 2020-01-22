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
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address_id` INT NULL,
  `admin` boolean NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (address_id) REFERENCES address(id));

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
  `author_id` INT NOT NULL,
  `type_id` INT NOT NULL,
  `description` VARCHAR(1000) NULL,
  `rating` DOUBLE NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (author_id) REFERENCES author(id),
  FOREIGN KEY (type_id) REFERENCES book_type(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`LoanedBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`loaned_books` (
  `id` INT NOT NULL,
  `user_id` INT NULL,
  `book_id` INT NULL,
  `date_to_return` DATE NULL,
  PRIMARY KEY (`id`),
   FOREIGN KEY (user_id) REFERENCES user_bookstore(id),
  FOREIGN KEY (book_id) REFERENCES book(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`UserAccount`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_account` (
  `id` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `is_valid` boolean NULL,
  `expiration_date` date NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`ReadBooks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`read_books` (
  `id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `read_pages` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (book_id) REFERENCES book(id),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));