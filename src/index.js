'use strict';

const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => res.send('Hello World! 4'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
