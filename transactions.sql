CREATE TABLE `transactions` (
  `id` mediumint(9) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `amount` Decimal(19,4) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `note` varchar(300) DEFAULT NULL
);

INSERT INTO `transactions` (`id`,`name`,`amount`,`type`,`date`, `note`) VALUES (NULL, "Tiffany & Co.", '500',"withdrawal", '2015-04-11', "Tennis Bracelet");
