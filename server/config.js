// USAGE: This config file should be placed inside the server folder

var config = {};

config.db = {};
config.prod_db = {};
config.test_db = {};

//production db credentials
config.prod_db.host = "vhw3t8e71xdz9k14.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
config.prod_db.user = "ysl7tl8kom3eqlm6";
config.prod_db.password = "h9ax1h8bkk9v8qog";
config.prod_db.database = 'wq87o6l37jigk9p5';

//test db credentials
config.test_db.host = "fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
config.test_db.user = "rziicv90jjsju3xj";
config.test_db.password = "eso1lssuop8145gk";
config.test_db.database = 'x9ptoxf7hkxdbkme';

module.exports = config;