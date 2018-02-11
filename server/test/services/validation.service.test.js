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
});