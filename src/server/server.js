const fs = require('fs');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const expressStaticGzip = require('express-static-gzip');

dotenv.config()
const app = express();
const port = process.env.PORT || 3001;

app.use('/', expressStaticGzip(path.join(__dirname + '/../../public')));

app.use(express.static('public', { index: false }));

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname + '/../../public/index.html'))
});

app.listen(port, err => {
  if (err) {
    throw err
  };

  console.log(`GoRead frontend listening on port ${port} ✨`)
})
