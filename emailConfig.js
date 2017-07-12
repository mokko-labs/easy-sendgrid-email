var _ = require('lodash');

/**
 * req: Request Object(Object)
 *
 * res: Response Object(Object)
 *
 * toField: To the reciever of the email(String)
 *
 * subject: Subject of the email(String)
 *
 * ccField: To the cc of the email(Array)
 *
 * bccField: To the bcc of the email(Array)
 *
 * messageSubstitutions: Substitution field name corresponding to the value(JSON).Example '$variable_name': value
 *
 * message: The message with the substitution variables as '$variable_name'(String) as html
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

  // This should be the function that creates and sends email; use this.sg and this.apiKey.
  // Set the default values

  _.defaults(options, { ccField: undefined, bccField: undefined, templateId: undefined, message: undefined, messageSubstitutions: undefined},
    { ccField: [], bccField: [], message: '', templateId: '', messageSubstitutions: '' });

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

  // Delete the cc and bcc field if they are empty
  if(options.ccField.length == 0) {
    delete sendGridData.body.personalizations[0].cc;
  }
  if(options.bccField.length == 0) {
    delete sendGridData.body.personalizations[0].bcc;
  }



  var request = sg.emptyRequest(sendGridData);

  //check if the email gets sent otherwise continue
  return sg.API(request)
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
