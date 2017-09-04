# easy-sendgrid-email

# How to Use this easy-sendgrid-email:-

> easyEmail.send({toField: req.body.email , message: `'Example Message'`, fromField: req.user.email, subject: `'Test'`})


### **Required** things for using easy-sendgrid-email:-

- **toField**: To the reciever of the email(String)
- **subject**: Subject of the email(String)
- **fromFieldName**: From the sender of the name(String)
- **fromFieldEmail**: From the sender of the email(String)
- **message**: Add the message here with the fields you want to replace(Array).Example ['message_with_fields_in_it', 'message1_with_fields_in_it', 'message2_with_fields_in_it']


### **Optional** things for using easy-sendgrid-email:-

- **ccField**: To the cc of the email(Array). Either , separated emails or set the name as {name: 'Default name', email: 'Default Email'}
- **bccField**: To the bcc of the email(Array)
- **templateId**: The id of a template that you would like to use. If you use a template that contains a subject and content (either text or html), you do not need to specify those at the personalizations nor message level.(String)
-  **substitutions**: If you use a template id then the message can be embedded in the html substitution(Array)(Substitutions variable for sendgrid)
- **attachments**: Add the attachments as in the sendgrid basic template.(JSON)
- **messageSubstitutions**: Data corresponding to the field to be replaced in the message(Array[JSON]). 

> Example:  [{messageSubstitution_tag1: 'String',messageSubstitution_tag2: 'String'}, {messageSubstitution1_tag1: 'String',messageSubstitution1_tag2: 'String'}]

