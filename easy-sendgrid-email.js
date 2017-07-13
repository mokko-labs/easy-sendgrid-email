var _ = require('lodash');

/**
 *
 * toField: To the reciever of the email(String)(Required)
 *
 * subject: Subject of the email(String)(Required)
 *
 * ccField: To the cc of the email(Array)(Optional)
 *
 * bccField: To the bcc of the email(Array)(Optional)
 *
 * messageSubstitutions: Substitution field name corresponding to the value(JSON)(Optional).Example '$variable_name': value
 *
 * message: The message with the substitution variables as '$variable_name'(String) as html(Required)
 *
 * */

function emailHelper(sendgridApiKey) {
  return new emailHelperInstance(sendgridApiKey);
}

function emailHelperInstance(sendgridApiKey) {
  this.apiKey = sendgridApiKey;
  this.sg = require('sendgrid')(sendgridApiKey);
}

emailHelperInstance.prototype.send = function(options) {

  // Set the default values
  var def = {
    message: '',
    templateId: '',
    messageSubstitutions: ''
  }

  var options = _.merge(def, options);
  console.log(options)

  // Substitute the Variable
  Object.keys(options.messageSubstitutions).map(function(data, key) {
    options.message = options.message.replace(data, options.messageSubstitutions[data]);
  })

  // Customise sendGrid Data
  var sendGridData = {
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: options.toField
            },
          ],
          cc: options.ccField,
          bcc: options.bccField,
        },
      ],
      subject: options.subject,
      from: {
        email: options.fromField,
      },
      content: [{
        type: 'text/html',
        value: options.message
      }]
    },
  }

  var request = this.sg.emptyRequest(sendGridData);

  //check if the email gets sent otherwise continue
  return this.sg.API(request)
      .then(function(response){
      console.log(response)
})
  .catch(function(error) {
    //error is an instance of SendGridError
    //The full response is attached to error.response
    console.log(error.response.statusCode);
  throw error
});

}


module.exports = emailHelper;
