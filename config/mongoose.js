const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('development:mongoose');
mongoose
.connect(`${config.get("MONGODB_URI")}/Scatch`)
.then(() => {
    debug('Connected to the database');
}
)
.catch((err) => {
    debug('Error connecting to the database', err);
}
);

module.exports = mongoose.connection;