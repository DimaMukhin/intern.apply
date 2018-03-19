DROP TABLE IF EXISTS jobRating;
CREATE TABLE jobRating (
                        jobId INT(11) NOT NULL,
                        score DECIMAL(3,2) DEFAULT '0.00' NOT NULL,
                        votes INT(11) DEFAULT '0' NOT NULL,
                        PRIMARY KEY(jobId),
                        CONSTRAINT jobId___fk FOREIGN KEY (jobId) REFERENCES job (id) ON DELETE CASCADE );
INSERT INTO jobRating(jobId, score, votes) VALUES 
                        (1, 1.0, 1),
                        (2, 2.0, 2);