const express = require('express');
const cron = require('node-cron');
const indexRoute = require('./routes/index');
const cookieHelper = require('./lib/cookieHelper');
const updateNewsAnalysisCron = require('./cron/UpdateNewsAnalysis');

const app = express();

app.use(cookieHelper.parseIP);

app.use('/', indexRoute);

app.set('port', process.env.PORT || 4000);
app.set('host', process.env.HOST || '127.0.0.1');

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('host') + ':' + app.get('port'));
});

// Scheduler which runs every 5-mins
const cronTaskToUpdateNewAnalysis = cron.schedule('*/5 * * * *', () => {
  console.log('getting in cron task to update news analysis');
  updateNewsAnalysisCron.perform();

})
cronTaskToUpdateNewAnalysis.start();
