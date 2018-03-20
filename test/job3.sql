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
INSERT INTO job (id, organization, title, location, description, url) VALUES 
                        (1, 'Test Org', 'test title', '123 test st', 'test description', 'https://www.testurl1.com'),
                        (2, 'Electronic Test', 'second title', '456 test avenue', 'this is a description for a test', 'https://www.testurl2.com'),
                        (3, 'The Test Mafia', 'second title', '456 test avenue', 'this is a long long long long long long long long long long long long long description', 'https://www.testurl3.com'),
                        (4, 'Together We Test', 'fourth title', '789 test blvd', 'No description', 'https://www.testurl4.com');