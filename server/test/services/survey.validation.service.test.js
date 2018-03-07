const expect = require('chai').expect;

const validation = require('../../services/survey.validation.service');

describe('survey.validation.service.js', () => {

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