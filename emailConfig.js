/**
 * Either define the api keys here or link it as the config environment
 *
 * Uncomment below or Add your own files*/
// import config from '../config/environment';
// var sg = require('sendgrid')(config.sendGrid.apiKey);   //add the sendgrid and its api key

import _ from 'lodash';

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
 * substitutions: Substitution field name corresponding to the value(JSON).Example '$variable_name': value
 *
 * message: The message with the substitution variables as '$variable_name'(String) as html */
export default function customEmail (options) {
  // Set the default values

  _.defaults(options, { subject: undefined, ccField: undefined, bccField: undefined, substitution: undefined, message: undefined },
    { subject: 'Your Demo Subject', ccField: [], bccField: [], substitution: {}, message: '' });

  // Substitute the Variable
  Object.keys(options.substitutions).map((data, keys) => {
    options.message = options.message.replace(data, options.substitutions[data]);
  })

  // Customise sendGrid Data
  let sendGridData = {
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
          subject: options.subject,
          substitutions: {
            '%message%': options.message
          },
        },
      ],
      from: {
        name: 'Your Email Name',
        email: 'contact@youremailname.com',
      },
      template_id: "your template id",
    },
  }

  var request = sg.emptyRequest(sendGridData);

  //check if the email gets sent otherwise continue
  return sg.API(request)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      //error is an instance of SendGridError
      //The full response is attached to error.response
      console.log(error.response.statusCode);
      throw error
    });
}
