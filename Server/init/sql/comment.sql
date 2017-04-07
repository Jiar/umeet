CREATE TABLE IF NOT EXISTS  `comment` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `pid` int(12) NOT NULL,
  `post_id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `content` longtext DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`post_id`) references `post`(`id`),
  FOREIGN KEY (`user_id`) references `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;