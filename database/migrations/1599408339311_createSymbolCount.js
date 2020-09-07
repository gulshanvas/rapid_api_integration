module.exports = {
  'up': 'create table symbol_count(' +
    '  `id` bigint(20) NOT NULL AUTO_INCREMENT,\n' +
    '  `symbol` varchar(10) NOT NULL,\n' +
    '  `country` varchar (10) NOT NULL,\n' +
    '  `api_name` varchar (30) NOT NULL,\n' +
    '  `count` int(4) NOT NULL,\n' +
    '  `created_at` int(11) NOT NULL,\n' +
    '  `updated_at` int(11) NOT NULL,\n' +
    '  PRIMARY KEY (`id`),\n' +
    '  UNIQUE KEY `uk_1` (`symbol`, `country`)\n' +
    ')',
  'down': 'drop table if exists symbol_count;'
}