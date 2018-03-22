# Intern.Apply

https://intern-apply.herokuapp.com  
For more information about the system see [/doc](https://github.com/DimaMukhin/intern.apply/tree/master/doc)

## Requirements

1. [Node.js and NPM](https://nodejs.org/en/)
2. [Angular CLI](https://cli.angular.io/)

## When evaluating

1. Please use a windows OS machine
2. Please make sure that Chrome browser is installed (and please run the front end tests on Chrome and not in the background)
3. Please set the system timezone to Winnipeg time zone.

## Getting started

1. Clone the project
2. Navigate to the project directory on your terminal
3. In the terminal, run `npm install` to install all project dependencies
4. In the terminal, run `ng build` to build the web front end
5. In the terminal, run `node server` to start the server on localhost:3000
6. Use browser to navigate to localhost:3000

## Running tests

run `npm test` to run backend tests (Note: will have to stop `node server` to run these tests)<br/>
run `ng test` to run web front end integration tests (please run the front end tests on Chrome and not in the background)  
run `npm run e2e` to run web front end system tests (please run the front end tests on Chrome and not in the background)  

Troubleshooting: If the tests do not pass at first, please try again since the integration and acceptance tests are using a shared remote test database. We justify this decission based on the scale of our project, the small amount of developers in our group, and the complexity and difficulty to automatically lunch a local test MySQL database. Instead we focused on creating more than 300 essential tests across our application to make it very robust.

## Updates and Justifications

* After some team discussion we decided to put the Registration feature on hold and focus on other more important aspects and features.
* We decided that for simplicity and because of the size of our project, we would use a remote test DB for integration and acceptance tests, instead of using a local DB.
* We decided to not implement certain features that were going to use the Registration feature and only be available to admin users,
such as viewing the survey results, as we would need to implement some other way to lock them.

## Implemented features

1. Job-list. 
    * A display of all available jobs. 
    * Can be found on the home page.
2. Add-job
    * Can be found after clicking on the "Add Job" link on the nav-bar
3. Job-details
    * Can be found after clicking on any of the jobs on the home page
4. Contact-us
    * Can be found after clicking on the "Contact" link in the footer
5. Comments
    * Can be found after clicking on any of the jobs
6. Survey
    * Can be found in the footer
7. Rating
    * Can be found after clicking on any of the jobs
8. Salary
    * Can be found after clicking on any of the jobs
9. Search 
    * Can be found in the navigation bar
10. Q&A Board
    * Can be found in the navigation bar
11. Answers
    * can be found after clicking on "Q&A" in the navbar, and then clicking on a question
12. Apply button
    * fully functional apply button can now be found inside of every job
