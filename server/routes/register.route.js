const db = require('../database/db.service');

module.exports = (router) => {

    /**
     * add a user to the database
     */
    router.post('/reg', (req, res) => {
        const user = {
            username: res.body.username,
            password: res.body.password,
            email: res.body.email
        };

        db.addUser(user, (err, response) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });

};
