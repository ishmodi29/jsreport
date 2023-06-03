require('dotenv').config();
const fs = require('fs');
const path = require('path');
const logsDir = path.join(__dirname, 'logs');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
const jsreport = require('jsreport')({
  httpPort: process.env.PORT || 3000,
  extensions: {
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
  console.log('server started.')
})
