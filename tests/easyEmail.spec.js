var config = require('../config');
var easyEmail = require('../easy-sendgrid-email')(config.sendGrid.apiKey);

var chai = require('chai')
var chaiAsPromised = require("chai-as-promised");

var expect = chai.expect
var should = chai.should()

chai.use(chaiAsPromised);


var options;
describe('should validate the sender', function () {
  before(function () {
    options = {
      fromEmail: 'pritish@mokko.io',
      subject: 'demo subject',
      message: 'demo content'
    }
  });
  it('check if the sender is null', function () {
    // Should always throw an error
    return easyEmail.send(options)
      .then(function(success) {
        expect(success.statusCode).to.deep.equal(400)
      })
      .catch(function(error) {
        expect(error.response.statusCode).to.deep.equal(400)
      })
  });
  it('check if the sender is invalid email', function () {
    options.to = 'pritish'
    // Should always throw an error
    return easyEmail.send(options)
      .then(function(success) {
        expect(success.statusCode).to.deep.equal(400)
      })
      .catch(function(error) {
        expect(error.response.statusCode).to.deep.equal(400)
      })
  });
  it('check if the sender is valid email', function () {
    options.to = 'pritish@mokko.io'
    // Should always succeed
    return easyEmail.send(options)
      .then(function(success) {
        expect(success.statusCode).to.deep.equal(202)
      })
      .catch(function(error) {
        expect(error.response.statusCode).to.deep.equal(202)
      })
  });
});

/*describe('should validate the sender', function () {
  before(function () {
    var options = {
      to
    }
  });
  it('should result in three using the return style approach', function () {
    var result = calculator.add(1, 2);
    expect(result).equal(3);
  });
});

describe('should validate the sender', function () {
  before(function () {
    var options = {
      to
    }
  });
  it('should result in three using the return style approach', function () {
    var result = calculator.add(1, 2);
    expect(result).equal(3);
  });
});

describe('should validate the sender', function () {
  before(function () {
    var options = {
      to
    }
  });
  it('should result in three using the return style approach', function () {
    var result = calculator.add(1, 2);
    expect(result).equal(3);
  });
});*/
