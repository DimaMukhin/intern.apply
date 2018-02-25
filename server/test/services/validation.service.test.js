const expect = require('chai').expect;

const validation = require('../../services/validation.service');

describe('validation.service.js', () => {

    describe('validateEmail', () => {

        it('should return true for a valid email address', () => {
            let validEmail = 'dima.mukhin@gmail.com';
            expect(validation.validateEmail(validEmail)).to.be.true;
        });

        it('should return false for an invalid email address', () => {
            let invalidEmail = 'dima.mukhingmail.com';
            expect(validation.validateEmail(invalidEmail)).to.be.false;
        });

        it('should return false for a valid email address that is too long', () => {
            let invalidEmail = 'dima.mukhin@gmailfsddddddddddddddddddddddddddddddddddddddddddfaefasdfxzcvsdfawefasdfzxcvsdfaewfasdfzxcv.com';
            expect(validation.validateEmail(invalidEmail)).to.be.false;
        });

        it('should return false for an empty email address', () => {
            let invalidEmail = '';
            expect(validation.validateEmail(invalidEmail)).to.be.false;
        });

        it('should return false for an undefined email address', () => {
            let invalidEmail = '';
            expect(validation.validateEmail(invalidEmail)).to.be.false;
        });
    });

    describe('validateContactMessageTitle', () => {

        it('should return true for a valid contact-us message title', () => {
            let validTitle = 'hello world';
            expect(validation.validateContactMessageTitle(validTitle)).to.be.true;
        });

        it('should return false for a title that is too long', () => {
            let invalidTitle = 'hello worlddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd';
            expect(validation.validateContactMessageTitle(invalidTitle)).to.be.false;
        });

        it('should return false for an empty title', () => {
            let invalidTitle = '';
            expect(validation.validateContactMessageTitle(invalidTitle)).to.be.false;
        });

        it('should return false for an undefined title', () => {
            let invalidTitle = undefined;
            expect(validation.validateContactMessageTitle(invalidTitle)).to.be.false;
        });
    });

    describe('validateContactMessageBody', () => {

        it('should return true for a valid contact-us message body', () => {
            let validBody = 'hello world';
            expect(validation.validateContactMessageBody(validBody)).to.be.true;
        });

        it('should return false for a contact-us message body that is too long', () => {
            let invalidBody = 'hello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello worldhello world';
            expect(validation.validateContactMessageBody(invalidBody)).to.be.false;
        });

        it('should return false for an empty contact message body', () => {
            let invalidBody = '';
            expect(validation.validateContactMessageBody(invalidBody)).to.be.false;
        });

        it('should return false for an undefined contact message body', () => {
            let invalidBody = undefined;
            expect(validation.validateContactMessageBody(invalidBody)).to.be.false;
        });
    });

    describe('validateID', () => {

        it('should return true for a valid id', () => {
            let validID = 7357;
            expect(validation.validateID(validID)).to.be.true;
        });

        it('should return false for a decimal id', () => {
            let decimalID = 3.14159265
            expect(validation.validateID(decimalID)).to.be.false;
        });

        it('should return false for a non number id', () => {
            let wordID = 'Testing'
            expect(validation.validateID(wordID)).to.be.false;
        });
    });

    describe('validateJobOrganization', () => {

        it('should return true for a valid job organization', () => {
            let validOrg = 'I am a valid organization';
            expect(validation.validateContactMessageBody(validOrg)).to.be.true;
        });

        it('should return false for a job organization that is too long', () => {
            let invalidOrg = 'I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job organization ';
            expect(validation.validateContactMessageBody(invalidOrg)).to.be.false;
        });

        it('should return false for an empty job organization', () => {
            let emptyOrg = '';
            expect(validation.validateContactMessageBody(emptyOrg)).to.be.false;
        });
    });

    describe('validateJobTitle', () => {

        it('should return true for a valid job title', () => {
            let validTitle = 'I am a valid title';
            expect(validation.validateContactMessageBody(validTitle)).to.be.true;
        });

        it('should return false for a job title that is too long', () => {
            let invalidTitle = 'I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title ';
            expect(validation.validateContactMessageBody(invalidTitle)).to.be.false;
        });

        it('should return false for an empty job title', () => {
            let emptyTitle = '';
            expect(validation.validateContactMessageBody(emptyTitle)).to.be.false;
        });
    });

    describe('validateJobLocation', () => {

        it('should return true for a valid job location', () => {
            let validLoc = 'I am a valid location';
            expect(validation.validateContactMessageBody(validLoc)).to.be.true;
        });

        it('should return false for a job location that is too long', () => {
            let invalidLoc = 'I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job location ';
            expect(validation.validateContactMessageBody(invalidLoc)).to.be.false;
        });

        it('should return false for an empty job location', () => {
            let emptyLoc = '';
            expect(validation.validateContactMessageBody(emptyLoc)).to.be.false;
        });
    });

    describe('validateJobDescription', () => {

        it('should return true for a valid job description', () => {
            let validDesc = 'I am a valid description';
            expect(validation.validateContactMessageBody(validDesc)).to.be.true;
        });

        it('should return false for a job description that is too long', () => {
            let invalidDesc = 'I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job description ';
            expect(validation.validateContactMessageBody(invalidDesc)).to.be.false;
        });

        it('should return false for an empty job description', () => {
            let emptyDesc = '';
            expect(validation.validateContactMessageBody(emptyDesc)).to.be.false;
        });
    });

    describe('validateJobID', () => {
        it('should return true for a valid job id', () => {
            let validJobID = 1;
            expect(validation.validateJobID(validJobID)).to.be.true;
        });

        it('should return false for a job id that is not a number', () => {
            let invalidJobID = 'this is not a number';
            expect(validation.validateJobID(invalidJobID)).to.be.false;
        });

        it('should return false for a job id that is undefined', () => {
            let invalidJobID = undefined;
            expect(validation.validateJobID(invalidJobID)).to.be.false;
        });

        it('should return false for a job id that is a floating number', () => {
            let invalidJobID = 4.4;
            expect(validation.validateJobID(invalidJobID)).to.be.false;
        });

        it('should return false for a job id that is negative', () => {
            let invalidJobID = -5;
            expect(validation.validateJobID(invalidJobID)).to.be.false;
        });
    });

    describe('validateCommentMessage', () => {
        it('should return true for a valid comment message', () => {
            let validCommentMessage = 'test this message';
            expect(validation.validateCommentMessage(validCommentMessage)).to.be.true;
        });

        it('should return false for a comment message that is too short', () => {
            let invalidCommentMessage = '';
            expect(validation.validateCommentMessage(invalidCommentMessage)).to.be.false;
        });

        it('should return false for a comment message that is too long', () => {
            let invalidCommentMessage = 'too longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo long';
            expect(validation.validateCommentMessage(invalidCommentMessage)).to.be.false;
        });

        it('should return false for a comment message that is just empty spaces', () => {
            let invalidCommentMessage = '          ';
            expect(validation.validateCommentMessage(invalidCommentMessage)).to.be.false;
        });
    });

    describe('validateCommentAuthor', () => {
        it('should return true for a valid author name', () => {
            let validAuthorName = 'Dimba';
            expect(validation.validateCommentAuthor(validAuthorName)).to.be.true;
        });

        it('should return false for an author name that is too short', () => {
            let invalidAuthorName = '';
            expect(validation.validateCommentAuthor(invalidAuthorName)).to.be.false;
        });

        it('should return false for an author name that is too long', () => {
            let invalidAuthorName = 'too longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo longtoo long';
            expect(validation.validateCommentAuthor(invalidAuthorName)).to.be.false;
        });

        it('should return false for an author name that is just empty spaces', () => {
            let invalidAuthorName = '          ';
            expect(validation.validateCommentAuthor(invalidAuthorName)).to.be.false;
        });
    });

    describe('validateSurvey', () => {
        it('should return true for a valid survey', () => {
            let validSurvey = ['True', 'Agree'];
            expect(validation.validateSurvey(validSurvey)).to.be.true;
        });

        it('should return false for an empty survey', () => {
            let invalidSurvey = [];
            expect(validation.validateSurvey(invalidSurvey)).to.be.false;
        });

        it('should return false for a survey that has a null in it', () => {
            let invalidSurvey = ['True', null];
            expect(validation.validateSurvey(invalidSurvey)).to.be.false;
        });
    });
});