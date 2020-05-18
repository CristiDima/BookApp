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
  `phone_number` VARCHAR(10),
  `is_admin` boolean NOT NULL,
  `total_books` INT NULL DEFAULT 5,
  PRIMARY KEY (`id`),
  FOREIGN KEY (address_id) REFERENCES address(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`user_credentials`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_credentials` (
  `id` INT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`user_reset_password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_reset_password` (
  `id` INT NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `expires_at` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`user_online_account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_online_account` (
  `id` INT NOT NULL,
  `is_valid` boolean NOT NULL,
  `activated_at` DATETIME NOT NULL,
  `expires_at` DATETIME NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`user_physical_account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_physical_account` (
  `id` INT NOT NULL,
  `is_valid` boolean NOT NULL,
  `activated_at` DATETIME NOT NULL,
  `expires_at` DATETIME NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`user_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_session` (
  `id` INT NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `created` DATETIME NOT NULL,
  `is_valid` boolean NOT NULL,
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
  `photo` VARCHAR(200) NULL,
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
  `description` TEXT NOT NULL,
  `rating` DOUBLE NULL,
  `votes` DOUBLE NULL,
  `pages` INT NULL,
  `year` int NULL,
  `photo` VARCHAR(200) NULL,
  `file` VARCHAR(200) NULL,
  `total` INT NOT NULL,
  `loaned` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

-- -----------------------------------------------------
-- Table `votes`.`user_votes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`user_vote` (
  `id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` DOUBLE NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id),
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
-- Table `cdlstore`.`current_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`loaned_books` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  `loaned_at` DATETIME NOT NULL,
  `date_to_return` DATETIME NOT NULL,
  `ordered` boolean DEFAULT true,
  `delivered` boolean DEFAULT false,
  `returned` boolean DEFAULT false,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id),
  FOREIGN KEY (book_id) REFERENCES book(id));

-- -----------------------------------------------------
-- Table `cdlstore`.`loaned_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`library` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `book_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (user_id) REFERENCES user_bookstore(id),
  FOREIGN KEY (book_id) REFERENCES book(id));

  -- -----------------------------------------------------
-- Table `cdlstore`.`loaned_books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cdlstore`.`wishlist` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `book_id` INT NOT NULL,
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

INSERT INTO user_bookstore(`id`, `first_name`, `last_name`, `address_id`, `phone_number`, `is_admin`) VALUES  (1, 'Cristian', 'Dima', 1, '0123456789', true);

INSERT INTO user_credentials(`id`, `email`, `password`,  `user_id`) VALUES  (1, 'cristiandima30@gmail.com', '6a5eb5561b803c80d91ca7a62a7e24e7', 1);