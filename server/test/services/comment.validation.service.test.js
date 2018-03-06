const expect = require('chai').expect;

const validation = require('../../services/comment.validation.service');

describe('comment.validation.service.js', () => {
    
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
});