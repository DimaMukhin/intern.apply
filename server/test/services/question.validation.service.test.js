const expect = require('chai').expect;

const validation = require('../../services/question.validation.service');

describe('question.validation.service.js', () => {
    describe('validateQuestionTitle', () => {
        it('should return true for a valid question title', () => {
            let validQuestionTitle = 'valid title!';
            expect(validation.validateQuestionTitle(validQuestionTitle)).to.be.true;
        });

        it('should return false for a title that is just empty spaces', () => {
            let invalidQuestionTitle = '    ';
            expect(validation.validateQuestionTitle(invalidQuestionTitle)).to.be.false;
        });

        it('should return false for a title that is longer than 45 characters', () => {
            let invalidQuestionTitle = 'longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong';
            expect(validation.validateQuestionTitle(invalidQuestionTitle)).to.be.false;
        });

        it('should return false for an undefined title', () => {
            let invalidQuestionTitle = undefined;
            expect(validation.validateQuestionTitle(invalidQuestionTitle)).to.be.false;
        });
    });

    describe('validateQuestionBody', () => {
        it('should return true for a valid question body', () => {
            let validQuestionBody = 'valid body!';
            expect(validation.validateQuestionBody(validQuestionBody)).to.be.true;
        });

        it('should return false for a body that is just empty spaces', () => {
            let invalidQuestionBody = '    ';
            expect(validation.validateQuestionBody(invalidQuestionBody)).to.be.false;
        });

        it('should return false for a body that is longer than 1000 characters', () => {
            let invalidQuestionBody = 'longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong';
            expect(validation.validateQuestionBody(invalidQuestionBody)).to.be.false;
        });

        it('should return false for an undefined body', () => {
            let invalidQuestionBody = undefined;
            expect(validation.validateQuestionBody(invalidQuestionBody)).to.be.false;
        });
    });

    describe('validateQuestionAuthor', () => {
        it('should return true for a valid question author', () => {
            let validQuestionAuthor = 'valid author!';
            expect(validation.validateQuestionAuthor(validQuestionAuthor)).to.be.true;
        });

        it('should return false for an author that is just empty spaces', () => {
            let invalidQuestionAuthor = '    ';
            expect(validation.validateQuestionAuthor(invalidQuestionAuthor)).to.be.false;
        });

        it('should return false for an author that is longer than 25 characters', () => {
            let invalidQuestionAuthor = 'longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglong';
            expect(validation.validateQuestionAuthor(invalidQuestionAuthor)).to.be.false;
        });

        it('should return false for an undefined author', () => {
            let invalidQuestionAuthor = undefined;
            expect(validation.validateQuestionAuthor(invalidQuestionAuthor)).to.be.false;
        });
    });
});