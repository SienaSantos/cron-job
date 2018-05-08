var sendgrid = require('sendgrid')('123', '123');

module.exports = {

  sendEmailGeneral:function(email,subject, body){
    console.log('sending email...')
    sendgrid.send({
      to:       email,
      from:     'do-not-reply@rfc360.com',
      subject:  subject,
      html:     body
    }, function(err, json) {
      if (err) {
        console.log(err);
        return { message: 'failed', data : err }
      } else {
        console.log(json);
        return { message: 'success', data : json }
      }
    });
  },

}
