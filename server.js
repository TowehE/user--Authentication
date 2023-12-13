require('./dbConfg/userConfg')
const express = require('express');

require('dotenv').config();

const userRouter = require('./userRouter/userRouter');

const app = express();

app.use(express.json());

app.get('/api/v1', (req, res) => {
  res.send('Welcome to the User Authentication Page');
});

app.use('/api/v1', userRouter);

const port = process.env.PORT; 

app.listen(port, () => {
  console.log(`Server running on port: ${port}`); 
});