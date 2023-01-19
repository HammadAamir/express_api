const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: false}));

app.use('/api/mobiles', require('./routers/api/mobile.js'));

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
