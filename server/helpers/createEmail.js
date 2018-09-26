const kue = require('kue')
const queue = kue.createQueue()

kue.app.listen(3001)

const registerEmail = function (userEmail, userName) {
    let mailOptions = {
        subject: `Hello ${userName}, thank you for register`,
        to: `${userEmail}`,
        from: 'adminOverflow@gmail.com',
        text: `Welcome to discussion forum, ${userName}`,
        html: `<b> Thank you ${userName},<br> for joining our forum <br><br> Now you can post question and answer`
    }

    queue.create('email', mailOptions).save(function (err) {
        if (!err) {
            console.log('Email created !!');
        }
    })
}

module.exports = { registerEmail }