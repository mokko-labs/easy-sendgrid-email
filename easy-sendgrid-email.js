var _ = require('lodash');
var util = require('util')

/**
 * Emails Sent as a promise
 *
 * to: To the reciever of the email(String)(Required)
 *
 * fromName: From the sender of the name(String)
 * fromEmail: From the sender of the email(String)
 *
 * subject: Subject of the email(String)(Required)
 *
 * cc: To the cc of the email(Array)(Optional) Either , separated emails or set the name as {name: 'Default name', email: 'Default Email'}
 *
 * bcc: To the bcc of the email(Array)(Optional)
 *
 * attachments: Add the attachments as in the sendgrid basic template.(JSON)
 *
 * templateId: The id of a template that you would like to use. If you use a template that contains a subject and content (either text or html),
 * you do not need to specify those at the personalizations nor message level.(String)(Optional)
 *      substitutions: If you use a template id then the message can be embedded in the html substitution(Array)(Substitutions variable for sendgrid)
 *
 *      message: Add the message here with the s you want to replace(Array).Example ['message_with_s_in_it', 'message1_with_s_in_it', 'message2_with_s_in_it']
 *
 *      messageSubstitutions: Data corresponding to the  to be replaced in the message(Array[JSON]).
 *
 *      Example [{messageSubstitution_tag1: 'String',messageSubstitution_tag2: 'String'}, {messageSubstitution1_tag1: 'String',messageSubstitution1_tag2: 'String'}]
 * */

function emailHelper(sendgridApiKey) {
  return new emailHelperInstance(sendgridApiKey);
}

// Api key function
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

  // CC  as array
  // To check if cc and bcc s are not undefined
  if(options.cc) {
    // If the User enters comma separated ccs
    Object.keys(options.cc).map(function(data, key) {
      if(emailRegex.test(options.cc[data])) {
        options.cc[data] = {email: options.cc[data]}
      }
    })
  }

  // Bcc  as array
  if(options.bcc) {
    // If the User enters comma separated bcc
    Object.keys(options.bcc).map(function(data, key) {
      if(emailRegex.test(options.bcc[data])) {
        options.bcc[data] = {email: options.bcc[data]}
      }
    })
  }

  // Replace the String Substitutions
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
              email: options.to
            },
          ],
          cc: options.cc,
          bcc: options.bcc,
        },
      ],
      subject: options.subject,
      from: {
        name: options.fromName,
        email: options.fromEmail
      },
      attachments: options.attachments
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
      throw error
    });

}


module.exports = emailHelper;
