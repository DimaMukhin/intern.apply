DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS question;

CREATE TABLE question (
            id INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(45) NOT NULL,
            body VARCHAR(1000) NOT NULL,
            author VARCHAR(45) NOT NULL,
            creationTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id));
INSERT INTO question (id, title, author, body) VALUES
              (1, 'first test title', 'Dima', 'this is the body'),
              (2, 'how much time to find a job?', 'Ben', 'I dont want to wait'),
              (3, 'what are you looking at?', 'dima', 'this is just a question');


CREATE TABLE answers (
                    questionId INT(11) NOT NULL,
                    body VARCHAR(1000) NOT NULL,
                    author VARCHAR(45) NOT NULL,
                    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                    FOREIGN KEY (questionId) REFERENCES question (id) ON DELETE CASCADE);
INSERT INTO answers (questionId, body, author) VALUES
                        (1, 'body of answer 1', 'Dima'),
                        (1, 'body of answer 2', 'Dima'),
                        (2, 'body of answer 1', 'Ben'),
                        (2, 'body of answer 2', 'Ben');