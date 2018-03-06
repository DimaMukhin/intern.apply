/*
ERROR CODES
===========
 0: 'unknown error',
 1: 'invalid email address',
 2: 'invalid message title',
 3: 'invalid message body',
 4: 'invalid jobID',
 5: 'invalid comment message',
 6: 'invalid comment author name',
 11: 'invalid job organization',
 12: 'invalid job title',
 13: 'invalid job location',
 14: 'invalid job description',
 31: 'invalid id',
 32: 'invalid job score',
 41: 'invalid salary',
 42: 'unknown salary type',
 51: 'invalid survey'
 */


class Error {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  getCode(){
    return this.code;
  }

  getMessage(){
    return this.message;
  }
}

module.exports = Error;