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
