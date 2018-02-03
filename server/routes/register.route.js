const db = require('../database/db.service');

module.exports = (router) => {
    /**
     * add a user to the database
     */
    router.post('/reg', (req, res) => {
        let isValid = true;

        //create user object with post parameters
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        // checking for null values

        if(user.username === null)
            isValid = false;
        else if(user.password === null)
            isValid = false;
        else if(user.email === null)
            isValid = false;

       if(isValid) {
           // pass user to db
           db.addUser(user, (err, response) => {
               if (err) res.status(400).send(err);
               else res.send(response);
           });
       }else{
           // not valid data
           res.status(400).send();
       }
    });
};
