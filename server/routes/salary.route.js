const db = require('../database/db.service');
const validate = require('../services/validation.service');
const Error = require('../models/error.model');

module.exports = (router) => {

    /**
     * POST a new salary
     * body format: { jobID: number, salary: number, salaryType: number }
     */
    router.post('/salary', (req, res) => {
        let request = req.body;
        let errors = [];

        if (!validate.validateJobID(request.jobID)) {
            errors.push(new Error(4));
        }

        salary = request.salary;

        if (!validate.validateSalary(salary)) 
            errors.push(new Error(41));        

        if (!validate.validateSalaryType(request.salaryType))
            errors.push(new Error(42));
        
        if (request.salaryType == 0) //yearly
            salary = salary / 1000;
        else if (request.salaryType == 1) //monthly
            salary = (salary * 12) / 1000;
        else if (request.salaryType == 2) //biweekly
            salary = (salary * 2 * 12) / 1000;
        else if (request.salaryType == 3) //hourly
            salary = (salary * 8 * 23 * 12) / 1000;

        if (errors.length > 0) {
            res.status(400).send(errors);
        } else {
            db.addSalaryToJob(request.jobID, salary, (err, response, fields) => {
                if (err) res.status(400).send([new Error(0)]);
                else {
                    request.salary = salary;
                    res.status(200).send(request);
                }
            });
        }
    });
}