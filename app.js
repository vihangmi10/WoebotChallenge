const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');


dotenv.config({ path: './config/config.env'});
const addData = require('./routes/addData');
const chatWithUsers = require('./routes/chat');
const wordGameWithUsers = require('./routes/wordGame');

let app = express();

app.use(express.json());
app.use('/api/v1/addData', addData);
app.use('/api/v1/chatWithUser',chatWithUsers);
app.use('/api/v1/startWordGame', wordGameWithUsers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on PORT --> ${PORT}`.cyan.inverse));
