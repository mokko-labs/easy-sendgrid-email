<p align="center">
  <h3 align="center">Easy SendGrid Email</h3>

  <p align="center">
    An easy approach to the Sendgrid Emails with less hassle.
    <br>
    <br>
  </p>
</p>
<br>

## Table of contents

- [Quick start](#quick-start)
- [Usage](#usage)
- [Status](#status)
- [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)


## Quick start

Several quick start options are available:

- [Download the latest release.](https://github.com/mokko-lab/easy-sendgrid-email/archive/master.zip)
- Clone the repo: `git clone https://github.com/mokko-lab/easy-sendgrid-email.git`
- Install with [npm](https://www.npmjs.com/): `npm install easy-sendgrid-email`
- Install with [yarn](https://yarnpkg.com/): `yarn add easy-sendgrid-email`

## Usage

Simple use case is as shown

```
easyEmail.send({
  to: 'reciever@example.com',
  fromName: 'DemoName',
  fromEmail: 'sender@example.com',
  subject: 'Demo Subject',
  message: 'Demo Content'
})
  .then(function(success) {
  // Handle the success here
  })
  .catch(function(error) {
  // Handle the error here
})
```

## Status

/*Right now its bootstrap npm / to be changed*/
[![npm version](https://img.shields.io/npm/v/bootstrap.svg)](https://www.npmjs.com/package/bootstrap)

## What's included

Within the download you'll find the following directories and files

```
easy-sendgrid-email/
├── easy-sendgrid-email.js
├── LICENSE
├── package.json
├── README.md

```

## Bugs and feature requests

Have a bug or a feature request? Please first read and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/mokko-lab/easy-sendgrid-email/issues/new).

## Documentation
Option | Type | Required | Default | Description
------------- | ------------- | ------------- | ------------- | -------------
to | String | true | to be provided | Set the email of the reciever
fromEmail | String | true | to be provided | Set the email of the sender
fromName | String | false | null | Set the email name
|  | | |**tip:** _Do not use empty name string if it is not required._
cc | Array | false | null | Set the email name/names for the cc.
bcc | Array | false | null | Set the email name/names for the bcc.
subject | String | true | to be provided | Set the subject of the email.
|  | | |**tip:** _Do not use empty name string if it is not required._
message | String | true | to be provided | Set the subject of the email.
attachments | String | false | null | Set the attachments object of the SendGrid here.
|  | | |**tip:** _Example - [{content: demoContent, type: 'application/pdf', filename: 'demoPdf.pdf'}]._
message | Array/String | true | to be provided | Set the message to be sent.
|  | | |**tip:** _Array type can be used if substitutions are to be used._
|  | | |**tip:** _Default type is text/html._

# Substitutions
Option | Type | Required | Default | Description
------------- | ------------- | ------------- | ------------- | -------------
templateId | String | false | null | Set the template ID of the SendGrid.
|  | | |**tip:** _Template ID can be created in SendGrid. _
messageSubstitutions | Array | false | null | Replaces the message fields with the messageSubstitution fields.
substitutions | Array | false | null | Replace the message fields with the substitution fields as in SendGrid templateID.
|  | | |**tip:** _Template ID is required. _

## Creators

**Pritish Vaidya**

- <https://github.com/pritishvaidya94>
- <https://github.com/pritishvaidya>


## Copyright and license
Code released under the [MIT License](https://github.com/mokko-lab/easy-sendgrid-email/blob/master/LICENSE).
