const express = require('express');
const R = require('ramda');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
  	next();
  }
});

app.post('/api/onboarding/readers', (req, res) => {
  console.log('POST /api/onboarding/readers')
  const newFields =  {
		"url": "http://dev:8000/api/readers/53810/",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773"
	}
	const response = R.merge(req.body, newFields);
  res.json(response);
});

app.post('/api/onboarding/current_reader/liked_genres', (req, res) => {
  console.log('/api/onboarding/current_reader/liked_genres')
  const response = {
    message: 'Added liked genres'
  }
  res.status(201);
  res.json(response);
});

const port = 5000
app.listen(port, () => {
  console.log(`Dummy server started on port ${port}!`);
});
