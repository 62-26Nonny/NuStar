const mongoose = require('mongoose');

const reqString = {
    type: String, 
    require: true
};

const searchShema = mongoose.Schema({
    keyword: reqString,
    count: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('searches', searchShema);