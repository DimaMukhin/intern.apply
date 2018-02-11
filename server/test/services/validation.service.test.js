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
            expect(validation.validateContactMessageBody(validID)).to.be.true;
        });

        it('should return false for a decimal id', () => {
            let decimalID = 3.14159265
            expect(validation.validateContactMessageBody(decimal)).to.be.false;
        });

        it('should return false for a non number id', () => {
            let wordID = 'Testing'
            expect(validation.validateContactMessageBody(wordID)).to.be.false;
        });
    });
});