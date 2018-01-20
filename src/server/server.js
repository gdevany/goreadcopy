const fs = require('fs');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const isBot = require('./isBot');
const prerenderPage = require('./prerenderPage');

dotenv.config()
const app = express();
const port = process.env.PORT || 3001;

app.get('*.js', function (req, res, next) {
  filename = req.url.replace(/\?.*$/, '')
  // Temporal hardcoded solution for not gzipped runtime file
  if (/runtime\.[\w]+\.js/.test(filename)) {
    next(); return;
  }
  // To be kept until better solution is found
  req.url = filename + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static('public', { index: false }));

app.get('*', async (req, res) => {
  if (isBot(req.headers['user-agent'])) {
    const localUrl = `http://localhost:${port}${req.originalUrl}`;

    console.log('[SSRServer]: localUrl received by SSR server:', localUrl);

    const html = await prerenderPage(localUrl);

    return res.send(html)
  }

  return res.sendFile(path.join(__dirname + '/../../public/index.html'))
});

app.listen(port, err => {
  if (err) {
    throw err
  };

  console.log(`GoRead frontend listening on port ${port} ✨`)
})
