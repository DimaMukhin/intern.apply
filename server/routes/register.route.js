const { User } = require('../shared/models/user.model');

const db = require('../database/db.service');

module.exports = (router) => {

    /**
     * add a user to the database
     */
    router.post('/reg', (req, res) => {
        const user = new User(
            req.query.username,
            req.query.password,
            req.query.email);

        db.addUser(user, (err, response) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });

};
