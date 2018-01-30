const db = require('../database/db.service');

module.exports = (router) => {
    /**
     * add a user to the database
     */
    router.post('/reg', (req, res) => {
        //create user object with post parameters
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        // pass user to db
        db.addUser(user, (err, response) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });
};
