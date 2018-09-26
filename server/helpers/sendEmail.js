const kue = require('kue')
const queue = kue.createQueue();
const nodemailer = require('nodemailer')
const CronJob = require('cron').CronJob

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'overflowhome@gmail.com',
    pass: '1234asdf.'
  }
})

new CronJob('10 * * * * *', function () {
  let job = queue.process('email', (job, done) => {
    sendEmail(job.data, done)
  })
}, null, true, 'Asia/Jakarta');

function sendEmail(mailOptions, done) {
  transporter.sendMail(mailOptions, (err, info) => {
    if(err){
      console.log(err.message);
    }else {
      console.log(info);
      done()
    }
  })
}