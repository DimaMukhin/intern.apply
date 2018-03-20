DROP TABLE IF EXISTS job;
CREATE TABLE job (
                id INT NOT NULL AUTO_INCREMENT,
                organization VARCHAR(45) NOT NULL,
                title VARCHAR(100) NOT NULL,
                location VARCHAR(45) NOT NULL,
                description VARCHAR(2000) NOT NULL,
                salary DECIMAL(4,1),
                numSalaries INT(10),
                url VARCHAR(1000) NOT NULL,
                PRIMARY KEY (id));
INSERT INTO job (id, organization, title, location) VALUES 
                      (1, 'Facebook', 'Software Engineer', 'winnipeg'),
                      (2, 'google', 'Software Developer', 'vancouver'),
                      (3, 'CityOFWinnipeg', 'Junior Dev', 'alberta'),
                      (4, 'CityOFWinnipeg', 'Soft Dev', 'toronto');