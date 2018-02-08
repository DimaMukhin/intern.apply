// USAGE: This config file should be placed inside the server folder

var config = {};

config.prod_db = {};
config.test_db = {};

//production db credentials
config.prod_db.host =  "";
config.prod_db.user = "";
config.prod_db.password=  "";
config.prod_db.database = '';

//test db credentials
config.test_db.host = "";
config.test_db.user = "";
config.test_db.password = "";
config.test_db.database = ''

module.exports = config;