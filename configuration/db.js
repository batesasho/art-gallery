const mongoose = require('mongoose');
const {DB_LINK} = require('./portConfiguration');


exports.dbInit = () => {
    mongoose.connection.on('open', () => console.log('Database is connected...'));
    return mongoose.connect(DB_LINK);
}


