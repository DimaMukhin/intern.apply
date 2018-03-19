DROP TABLE IF EXISTS contactMessage;
CREATE TABLE contactMessage (
                    id INT NOT NULL AUTO_INCREMENT,
                    email VARCHAR(45) NOT NULL,
                    title VARCHAR(45) NOT NULL,
                    message VARCHAR(300) NOT NULL,
                    PRIMARY KEY (id));
INSERT INTO contactMessage (id, email, title, message) VALUES 
                        (1, 'dima@gmail.com', 'test title', 'test body'),
                        (2, 'ben@gmail.com', 'second title', 'second body'),
                        (3, 'what@is.this', 'third title', 'third body');