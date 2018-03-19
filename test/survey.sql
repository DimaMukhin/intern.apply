DROP TABLE IF EXISTS surveyQuestion;
DROP TABLE IF EXISTS surveyResponse;
DROP TABLE IF EXISTS completedSurveyRes;
DROP TABLE IF EXISTS completedSurvey;

CREATE TABLE surveyQuestion (
                    id INT NOT NULL AUTO_INCREMENT,
                    question VARCHAR(300) NOT NULL,
                    questionType VARCHAR(300) NOT NULL,
                    questionIndex INT NOT NULL,
                    PRIMARY KEY (id));
INSERT INTO surveyQuestion (id, question, questionType, questionIndex) VALUES 
                        (1, 'Is this a test?', 'boolean', 1),
                        (2, '?', 'scale', 2);


CREATE TABLE surveyResponse (
                    id INT NOT NULL AUTO_INCREMENT,
                    response VARCHAR(300) NOT NULL,
                    questionType VARCHAR(300) NOT NULL,
                    PRIMARY KEY (id));
INSERT INTO surveyResponse (id, response, questionType) VALUES 
                        (1, 'True', 'boolean'),
                        (2, 'False', 'boolean'),
                        (3, 'Disagree', 'scale'),
                        (4, 'No Opinion', 'scale'),
                        (5, 'Agree', 'scale');


CREATE TABLE completedSurvey (
                        id INT NOT NULL AUTO_INCREMENT,
                        completionTime date NOT NULL,
                        PRIMARY KEY (id));
INSERT INTO completedSurvey (id, completionTime) VALUES 
                            (1, '2018-02-24'),
                            (2, '1100-01-01');


CREATE TABLE completedSurveyRes (
                                    id INT NOT NULL AUTO_INCREMENT,
                                    surveyID INT NOT NULL,
                                    response VARCHAR(300) NOT NULL,
                                    questionIndex INT NOT NULL,
                                    PRIMARY KEY (id),
                                    INDEX (surveyID),
                                    FOREIGN KEY (surveyID) REFERENCES completedSurvey(id) ON DELETE CASCADE);
INSERT INTO completedSurveyRes (id, surveyID, response, questionIndex) VALUES 
                                        (1, 1, 'True', 1),
                                        (2, 1, 'No Opinion', 2);