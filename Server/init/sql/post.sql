CREATE TABLE IF NOT EXISTS  `post` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `sort_id` int(12) NOT NULL,
  `user_id` int(12) NOT NULL,
  `title` varchar(25) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `type` int(1) DEFAULT 0,
  `modified_time` varchar(20) DEFAULT NULL,
  `is_modified` int(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`sort_id`) references `sort`(`id`),
  FOREIGN KEY (`user_id`) references `user`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;