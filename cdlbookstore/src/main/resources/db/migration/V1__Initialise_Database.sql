-- -----------------------------------------------------
-- Table `cdlstore`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`address` (
  `id` INT NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `district` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `cdlstore`.`user_bookstore`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_bookstore` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `address_id` INT NOT NULL,
  `is_admin` boolean NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (address_id) REFERENCES address(id));

  -- -----------------------------------------------------
-- Table `cdlstore`.`account_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_account_details` (
  `id` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`account_valability`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_account_valability` (
  `id` INT NOT NULL,
  `is_valid` boolean NOT NULL,
  `created` date NOT NULL,
  `expiration_date` date NULL,
  `account_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (account_id) REFERENCES user_account_details(id));

    -- -----------------------------------------------------
-- Table `cdlstore`.`user_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_session` (
  `id` INT NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `created` date NOT NULL,
  `is_valid` date NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`author`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`author` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `cdlstore`.`genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`genre` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `cdlstore`.`book`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`book` (
  `id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL NULL,
  `rating` DOUBLE NULL,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `cdlstore`.`available_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`available_books` (
  `id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `total` INT NULL,
  `loaned` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (book_id) REFERENCES book(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`book_authors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`book_authors` (
  `author_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  FOREIGN KEY (author_id) REFERENCES author(id),
  FOREIGN KEY (book_id) REFERENCES book(id));

  -- -----------------------------------------------------
-- Table `cdlstore`.`book_genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`book_genres` (
  `book_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
 FOREIGN KEY (book_id) REFERENCES book(id),
 FOREIGN KEY (genre_id) REFERENCES genre(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`loaned_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`loaned_books` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `loaned_at` DATE NOT NULL,
  `date_to_return` DATE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id),
  FOREIGN KEY (book_id) REFERENCES book(id));


-- -----------------------------------------------------
-- Table `cdlstore`.`online_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`online_books` (
  `id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `current_page` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (book_id) REFERENCES book(id),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));

-- --------------------------------------------------------
-- Initial inserts into db
-- --------------------------------------------------------

INSERT INTO address(`id`, `address`, `city`, `district`) VALUES  (1, 'George Enescu, nr 1', 'Craiova', 'Dolj');

INSERT INTO user_bookstore(`id`, `first_name`, `last_name`, `address_id`, `is_admin`) VALUES  (1, 'Cristian', 'Dima', 1, true);

INSERT INTO user_account_details(`id`, `email`, `password`,  `user_id`) VALUES  (1, 'cristiandima30@gmail.com', 'b7e055c6165da55c3e12c49ae5207455', 1);