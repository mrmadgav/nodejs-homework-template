const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')

class EmailService {
  constructor() {
    this.sender = sgMail
    this.GenerateTemplate = Mailgen
    this.link = 'http://localhost:5000'
  }

  createTemplate(verificationToken) {
    const mailGenerator = new this.GenerateTemplate({
      theme: 'cerberus',
      product: {
        name: 'App',
        link: this.link,
      },
    })
    const emailTemplate = {
      body: {
        intro:
          'Welcome to App!',
        action: {
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/users/verify/${verificationToken}`,
          },
        },
      },
    }
    return mailGenerator.generate(emailTemplate)
  }

  sendEmail(verificationToken, email) {
    const emailBody = this.createTemplate(verificationToken)
    this.sender.setApiKey(process.env.API_SENDGRID)
    const msg = {
      to: email,
      from: 'madgav@mail.ru',
      subject: 'Welcome to App! Confirm Your Email',
      html: emailBody,
    }
    this.sender.send(msg).then(() => {}, error => {
      console.error(error)

      if (error.response) {
        console.error(error.response.body)
      }
    })
  }
}

module.exports = EmailService
