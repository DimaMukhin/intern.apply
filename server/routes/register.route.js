
//import { User } from "../../src/app/shared/models/user.model";

const User = require('../shared/models/user.model');

const db = require('../database/db.service');

module.exports = (router) => {

    /**
     * GET all employers from the database
     */
    router.get('/job', (req, res) => {
        db.getAllJobs((err, response, fields) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });

    /**
     * add a user to the database
     */
    router.post('/reg', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const user = new User(username, password, email);

        db.addUser(user, (err, response, fields) => {
            if (err) res.status(400).send(err);
            else res.send(response);
        });
    });

};
