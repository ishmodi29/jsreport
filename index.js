require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from the main application');
});

const reportingApp = express();
app.use('/reporting', reportingApp);

const server = app.listen(process.env.PORT);

const jsreport = require('jsreport')({
  appPath: "/reporting",
  httpPort: process.env.PORT || 3000,
  extensions: {
    express: { app: reportingApp, server: server },
    authentication: {
      cookieSession: {
        secret: process.env.SECRET
      },
      admin: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      },
      enable: true
    }
  }
});

jsreport.init().then(() => {
  console.log('jsreport server started')
}).catch((e) => {
  console.error(e);
});
