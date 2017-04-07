CREATE TABLE IF NOT EXISTS  `post` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `pid` int(12) DEFAULT 0,
  `title` varchar(255) DEFAULT NULL,
  `create_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;