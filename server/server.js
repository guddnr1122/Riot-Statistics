const express = require('express');
const app = express();
const path = require('path');
const GameRouter = require('./routes/GameRouter')

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/api/game', GameRouter);

// app.use('/api/favs/', favsRouter);

// app.use('/api', APIRouter);

// serve index.html on the route '/' for homepage
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next)=>{
  const defaultErr = 
  {
    log: 'unknown middleware error',
    status: 400,
    message: {err: 'error occurred'}
  };
  const errorObj = {
    ...defaultErr,
    log: err.name + ' ' + err.message,
    message: {err: err.message}
  };
  console.log(errorObj.log);
  return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});

app.listen(3000);