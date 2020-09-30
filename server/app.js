const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 1234;

app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(`mongodb://localhost:${process.env.MONGO_PORT}/${process.env.DB_NAME}`, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(() => console.log('Connected to database'))
  .catch(error => console.log(error));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

app.use('/api/auth/', authRouter);

app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not found ${req.originalUrl}`)
  next(error);
});

app.use((err, req, res, next) => {
  err.status ?  res.status(err.status) : res.status(500);

  res.json({
    message: err.message,
    error: err,
    stack: err.stack
  });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});