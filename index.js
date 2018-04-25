const express = require('express');
const app = express();
const CronJob = require('cron').CronJob;
const emailApi =require ('./api/email')
const reportingData = require ('./api/reportingData')
const request = require('request')
const moment = require('moment')

const getFirstandLastDay = function(){
  //returns first day and last day of month
  var date = new Date(), y = date.getFullYear(), m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  firstDay = moment(firstDay).format('MM/DD/YYYY');
  lastDay = moment(lastDay).format('MM/DD/YYYY');

  return { firstDay, lastDay };
}

const generateReport = function(report){
  var { url, dateRange } = report
  var { firstDay, lastDay } = getFirstandLastDay()

  var link = dateRange ? `${url}?startDate=${firstDay}&endDate${lastDay}` : `${url}?date=${today}`;
  console.log('link ', link)

  request
    .get(link)
    .end(function(err, result){ 
      if(err){
        console.log(err)
      }else{
        console.log('result ', result)
      }
    })

}

const job = new CronJob({
  cronTime: '1 * * * * *',
  onTick: function() {

    var report = reportingData['booking'];

    var email = 'sienasantos18@gmail.com'
    var subject = 'CRON JOB'
    var body = '<p>Cron emailing test.</p>  Time: '+new Date();
    generateReport(report);
    // emailApi.sendEmailGeneral(email, subject, body)
    /*
     * Runs every day at 700pm
     */
    console.log("cron execution - every 1 min ", new Date());
		// code for your job goes here :)
  },
  start: false,
  timeZone: 'Asia/Manila'
});

job.start();

//this does nothing except tell now we're alive
const port = process.env.PORT || 2345;

app.listen(port, function () {
  console.log('app listening on port: ', port);
});
