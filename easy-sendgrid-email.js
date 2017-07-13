var _ = require('lodash');

/**
 *
 * toField: To the reciever of the email(String)(Required)
 *
 * subject: Subject of the email(String)(Required)
 *
 * ccField: To the cc of the email(Array)(Optional) Either , separated emails or set the name as {name: 'Default name', email: 'Default Email'}
 *
 * bccField: To the bcc of the email(Array)(Optional)
 *
 * messageSubstitutions: Substitution field name corresponding to the value(JSON)(Optional).Example '$variable_name': value
 *
 * message: The message with the substitution variables as '$variable_name'(String) as html(Required)
 *
 * templateId: The id of a template that you would like to use. If you use a template that contains a subject and content (either text or html),
 * you do not need to specify those at the personalizations nor message level.(String)(Optional)
 *      substitutions: If you use a template id then the message can be embedded in the html substitution
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

  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // To check if cc and bcc fields are not undefined
  if(options.ccField) {
    // If the User enters comma separated ccFields
    Object.keys(options.ccField).map(function(data, key) {
      if(emailRegex.test(options.ccField[data])) {
        options.ccField[data] = {email: options.ccField[data]}
      }
    })
  }

  if(options.bccField) {
    // If the User enters comma separated bccFields
    Object.keys(options.bccField).map(function(data, key) {
      if(emailRegex.test(options.bccField[data])) {
        options.bccField[data] = {email: options.bccField[data]}
      }
    })
  }

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
