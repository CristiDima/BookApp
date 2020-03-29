-- -----------------------------------------------------
-- Table `cdlstore`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`address` (
  `id` INT NOT NULL,
  `street` VARCHAR(200) NOT NULL,
  `number` INT NULL,
  `city` VARCHAR(100) NULL,
  `district` VARCHAR(100) NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `cdlstore`.`user_bookstore`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_bookstore` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `address_id` INT NULL,
  `admin` boolean NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (address_id) REFERENCES address(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`Authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`author` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `cdlstore`.`Genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`genre` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `cdlstore`.`Books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`book` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  `rating` DOUBLE NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `cdlstore`.`BookAuthors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`book_authors` (
  `author_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES author(id),
  FOREIGN KEY (book_id) REFERENCES book(id));

  -- -----------------------------------------------------
-- Table `cdlstore`.`BookGenres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`book_genres` (
  `book_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
 FOREIGN KEY (book_id) REFERENCES book(id),
 FOREIGN KEY (genre_id) REFERENCES genre(id));


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
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
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

-- --------------------------------------------------------
-- Initial inserts into db
-- --------------------------------------------------------

INSERT INTO address(`id`, `street`, `number`, `city`, `district`) VALUES  (1, 'George Enescu', 1, 'Craiova', 'Dolj');

INSERT INTO user_bookstore(`id`, `first_name`, `last_name`, `address_id`, `admin`) VALUES  (1, 'Cristian', 'Dima', 1, true);

INSERT INTO user_account(`id`, `email`, `password`, `is_valid`, `expiration_Date`, `user_id`) VALUES  (1, 'cristiandima30@gmail.com', 'testpass', true, null, 1);