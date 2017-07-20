var _ = require('lodash');
var util = require('util')

/**
 * Emails Sent as a promise
 *
 * toField: To the reciever of the email(String)(Required)
 *
 * subject: Subject of the email(String)(Required)
 *
 * ccField: To the cc of the email(Array)(Optional) Either , separated emails or set the name as {name: 'Default name', email: 'Default Email'}
 *
 * bccField: To the bcc of the email(Array)(Optional)
 *
 * templateId: The id of a template that you would like to use. If you use a template that contains a subject and content (either text or html),
 * you do not need to specify those at the personalizations nor message level.(String)(Optional)
 *      substitutions: If you use a template id then the message can be embedded in the html substitution(Array)(Substitutions variable for sendgrid)
 *
 *      message: Add the message here with the fields you want to replace(Array).Example ['message_with_fields_in_it', 'message1_with_fields_in_it', 'message2_with_fields_in_it']
 *
 *      messageSubstitutions: Data corresponding to the field to be replaced in the message(Array[JSON]).
 *
 *      Example [{messageSubstitution_tag1: 'String',messageSubstitution_tag2: 'String'}, {messageSubstitution1_tag1: 'String',messageSubstitution1_tag2: 'String'}]
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
    substitutions: '',
    templateId: '',
    messageSubstitutions: ''
  }

  options = _.merge(def, options);

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

  // Substitutions of the message with the messageSubstitution variables
  if(options.messageSubstitutions && options.message) {
    options.message.map(function(data, key) {
      Object.keys(options.messageSubstitutions[key]).map(function(tagsData, keys) {
        options.message[key] = options.message[key].replace(tagsData, options.messageSubstitutions[key][tagsData]);
      })
    })
  }

  // Customise sendGrid Data and set the basic template
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
        email: options.fromField
      },
    },
  }
  // If the user specifies a template id with a substitution tag then substitute it else send using the default content
  if(options.templateId == '' || options.substitutions == '') {
    _.chunk(options.message)
    sendGridData.body.content = [{
      type: 'text/html',
      value: options.message.toString()
    }]
  }
  else {
    sendGridData.body.template_id = options.templateId
    sendGridData.body.personalizations[0].substitutions = {}

    options.substitutions.map(function(data, key) {
      sendGridData.body.personalizations[0].substitutions['%' + data + '%'] = options.message[key]
    })
  }

  var request = this.sg.emptyRequest(sendGridData);

  // check if the email gets sent otherwise continue
  return this.sg.API(request)
    .then(function(response){
      return response
    })
    .catch(function(error) {
      // error is an instance of SendGridError
      // The full response is attached to error.response
      return error
    });

}


module.exports = emailHelper;
