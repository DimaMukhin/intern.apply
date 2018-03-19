DROP TABLE IF EXISTS comment;
CREATE TABLE comment (id INT NOT NULL AUTO_INCREMENT,
                          jobID INT NOT NULL,
                          message VARCHAR(300) NOT NULL,
                          author VARCHAR(45) NOT NULL,
                          ts TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          PRIMARY KEY (id),
                          FOREIGN KEY (jobID) REFERENCES job (id));
INSERT INTO comment (id, jobID, message, author) VALUES 
                              (1, 1, 'this is a nice comment body', 'dima'),
                              (2, 1, 'another comment for the same job', 'ben'),
                              (3, 2, 'this last comment is for job 2', 'rick');