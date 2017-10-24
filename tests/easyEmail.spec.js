var config = require('../config');
var easyEmail = require('../easy-sendgrid-email')(config.sendGrid.apiKey);

var chai = require('chai')

var expect = chai.expect

var options;
describe('should validate the sender', function () {
  before(function () {
    options = {
      fromEmail: 'pritish@mokko.io',
      subject: 'demo subject',
      message: 'demo content'
    }
  });
  it('check if the receiver is null', function () {
    // Should always throw an error
    return easyEmail.send(options)
      .then(function(success) {
        return expect(success.statusCode).to.deep.equal(400)
      })
      .catch(function(error) {
        return expect(error.response.statusCode).to.deep.equal(400)
      })
  });
  it('check if the receiver is invalid email', function () {
    options.to = 'pritish'
    // Should always throw an error
    return easyEmail.send(options)
      .then(function(success) {
        return expect(success.statusCode).to.deep.equal(400)
      })
      .catch(function(error) {
        return expect(error.response.statusCode).to.deep.equal(400)
      })
  });
  it('check if the receiver is valid email', function () {
    options.to = 'pritish@mokko.io'
    // Should always succeed
    return easyEmail.send(options)
      .then(function(success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function(error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });
});

describe('should validate the sender email and name', function () {
  before(function () {
    options = {
      to: 'pritishvaidya94@gmail.com',
      subject: 'demo subject',
      message: 'demo content'
    }
  });
  it('check if the sender is null', function () {
    // Should always throw an error
    return easyEmail.send(options)
      .then(function(success) {
        return expect(success.statusCode).to.deep.equal(400)
      })
      .catch(function(error) {
        return expect(error.response.statusCode).to.deep.equal(400)
      })
  });
  it('check if the sender is invalid email', function () {
    options.fromEmail = 'pritish'
    // Should always throw an error
    return easyEmail.send(options)
      .then(function(success) {
        return expect(success.statusCode).to.deep.equal(400)
      })
      .catch(function(error) {
        return expect(error.response.statusCode).to.deep.equal(400)
      })
  });
  it('check if the sender is valid email', function () {
    options.fromEmail = 'pritish@mokko.io'
    // Should always succeed
    return easyEmail.send(options)
      .then(function(success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function(error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });


  it('check if the email name is null', function () {
    options.fromName = null
    options.fromEmail = 'pritish@mokko.io'
    // Should always succeed
    return easyEmail.send(options)
      .then(function(success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function(error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });
});

describe('should validate the cc fields', function () {
  before(function () {
    options = {
      fromEmail: 'pritish@mokko.io',
      to: 'pritishvaidya94@gmail.com',
      subject: 'demo subject',
      message: 'demo content'
    }
  });
  it('check if the cc field is null', function () {
    // Should always succeed
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });

  it('check if the cc field is not null', function () {
    // Should always succeed
    options.cc = ['default@example.com', /*And many more can be specified*/]
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });
})

describe('should validate the bcc fields', function () {
  before(function () {
    options = {
      fromEmail: 'pritish@mokko.io',
      to: 'pritishvaidya94@gmail.com',
      subject: 'demo subject',
      message: 'demo content'
    }
  });
  it('check if the bcc field is null', function () {
    // Should always succeed
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });

  it('check if the bcc field is not null', function () {
    // Should always succeed
    options.bcc = ['default@example.com', /*And many more can be specified*/]
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });
})

describe('should validate the subject field', function () {
  before(function () {
    options = {
      fromEmail: 'pritish@mokko.io',
      to: 'pritishvaidya94@gmail.com',
      message: 'demo content'
    }
  });
  it('check if the subject is null', function () {
    // Should always throw an error
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(400)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(400)
      })
  });

  it('check if the subject is not null', function () {
    // Should always succeed
    options.subject = 'Demo Subject'
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });
})

describe('should validate the message field', function () {
  before(function () {
    options = {
      subject: 'Demo Subject',
      fromEmail: 'pritish@mokko.io',
      to: 'pritishvaidya94@gmail.com',
    }
  });
  it('check if the message is null', function () {
    // Should always throw an error
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(400)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(400)
      })
  });

  it('check if the message is not null and is a String', function () {
    // Should always succeed
    options.message = 'Demo Message'
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });

  it('check if the message is not null and is a String', function () {
    // Should always succeed
    options.message = ['Demo Message']
    return easyEmail.send(options)
      .then(function (success) {
        return expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function (error) {
        return expect(error.response.statusCode).to.deep.equal(202)
      })
  });
})


