const express = require('express');
const app = express();
const routes = require('./routes.js');
const {PORT} = require('./configuration/portConfiguration.js');
const hbs = require('express-handlebars');
const {dbInit} = require('./configuration/db.js');

app.engine('hbs', hbs.engine({extname: 'hbs'}));
app.set('view engine', "hbs");

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(routes);
dbInit();


app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
