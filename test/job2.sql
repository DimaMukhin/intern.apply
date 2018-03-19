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
INSERT INTO job (id, organization, title, location, description) VALUES
                      (1, 'Facebook', 'Software Engineer', 'winnipeg', 'Please come work for FB'),
                      (2, 'google', 'Software Developer', 'vancouver', 'cyka'),
                      (3, 'CityOFWinnipeg', 'Junior Dev', 'location', 'blat'),
                      (4, 'CityOFWinnipeg', 'Soft Dev', 'location', 'damn')