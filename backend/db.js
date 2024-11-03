const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log("connected to mongo successfully"))
        .catch((err) => console.error('Connection failed', err));
};

module.exports = connectToMongo;
