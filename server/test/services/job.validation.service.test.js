const expect = require('chai').expect;

const validation = require('../../services/job.validation.service');

describe('job.validation.service.js', () => {

    describe('validateJobOrganization', () => {

        it('should return true for a valid job organization', () => {
            let validOrg = 'I am a valid organization';
            expect(validation.validateJobOrganization(validOrg)).to.be.true;
        });

        it('should return false for a job organization that is too long', () => {
            let invalidOrg = 'I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job organization ';
            expect(validation.validateJobOrganization(invalidOrg)).to.be.false;
        });

        it('should return false for an empty job organization', () => {
            let emptyOrg = '';
            expect(validation.validateJobOrganization(emptyOrg)).to.be.false;
        });
    });

    describe('validateJobTitle', () => {

        it('should return true for a valid job title', () => {
            let validTitle = 'I am a valid title';
            expect(validation.validateJobTitle(validTitle)).to.be.true;
        });

        it('should return false for a job title that is too long', () => {
            let invalidTitle = 'I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  ';
            expect(validation.validateJobTitle(invalidTitle)).to.be.false;
        });

        it('should return false for an empty job title', () => {
            let emptyTitle = '';
            expect(validation.validateJobTitle(emptyTitle)).to.be.false;
        });
    });

    describe('validateJobLocation', () => {

        it('should return true for a valid job location', () => {
            let validLoc = 'I am a valid location';
            expect(validation.validateJobLocation(validLoc)).to.be.true;
        });

        it('should return false for a job location that is too long', () => {
            let invalidLoc = 'I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job location ';
            expect(validation.validateJobLocation(invalidLoc)).to.be.false;
        });

        it('should return false for an empty job location', () => {
            let emptyLoc = '';
            expect(validation.validateJobLocation(emptyLoc)).to.be.false;
        });
    });

    describe('validateJobDescription', () => {

        it('should return true for a valid job description', () => {
            let validDesc = 'I am a valid description';
            expect(validation.validateJobDescription(validDesc)).to.be.true;
        });

        it('should return false for a job description that is too long', () => {
            let invalidDesc = 'I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  I am an extremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremelyextremely long job title  ';
            expect(validation.validateJobDescription(invalidDesc)).to.be.false;
        });

        it('should return false for an empty job description', () => {
            let emptyDesc = '';
            expect(validation.validateJobDescription(emptyDesc)).to.be.false;
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

    describe('validateSalary', () => {
        it('should return true for a valid salary', () => {
            let validSalary = 1;
            expect(validation.validateSalary(validSalary)).to.be.true;
        });

        it('should return false for a salary that is not a number', () => {
            let invalidSalary = 'this is not a number';
            expect(validation.validateSalary(invalidSalary)).to.be.false;
        });

        it('should return false for a salary that is undefined', () => {
            let invalidSalary = undefined;
            expect(validation.validateSalary(invalidSalary)).to.be.false;
        });

        it('should return false for a salary that is a floating number', () => {
            let invalidSalary = 4.4;
            expect(validation.validateSalary(invalidSalary)).to.be.false;
        });

        it('should return false for a salary that is negative', () => {
            let invalidSalary = -5;
            expect(validation.validateSalary(invalidSalary)).to.be.false;
        });
    });

    describe('validateSalaryType', () => {
        it('should return true for a valid salaryType', () => {
            let validSalaryType = 0;
            expect(validation.validateSalaryType(validSalaryType)).to.be.true;
        });

        it('should return true for a valid salaryType', () => {
            let validSalaryType = 3;
            expect(validation.validateSalaryType(validSalaryType)).to.be.true;
        });

        it('should return false for a salaryType that is not a number', () => {
            let invalidSalaryType = 'this is not a number';
            expect(validation.validateSalaryType(invalidSalaryType)).to.be.false;
        });

        it('should return false for a salaryType that is undefined', () => {
            let invalidSalaryType = undefined;
            expect(validation.validateSalaryType(invalidSalaryType)).to.be.false;
        });

        it('should return false for a salaryType that is a floating number', () => {
            let invalidSalaryType = 4.4;
            expect(validation.validateSalaryType(invalidSalaryType)).to.be.false;
        });

        it('should return false for a salaryType that is negative', () => {
            let invalidSalaryType = -5;
            expect(validation.validateSalaryType(invalidSalaryType)).to.be.false;
        });

        it('should return false for a salaryType that is greater than 3', () => {
            let invalidSalaryType = 4;
            expect(validation.validateSalaryType(invalidSalaryType)).to.be.false;
        });
    });
});