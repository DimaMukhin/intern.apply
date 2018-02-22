/*
 calculating the rating of a job
 */

class JobRating{
    constructor(score, votes){
        this.score = score;
        this.votes = votes;
    }

    /**
     * adding a new vote
     * @param addedScore
     * @returns {number}
     */
    addVote(addedScore){
        const scoreSum = this.score * this.votes;
        this.votes++;
        this.score = (scoreSum + addedScore)/this.votes;
    }

    getScore(){
        return this.score;
    }

    getVotes(){
        return this.votes;
    }
}

module.exports = JobRating;