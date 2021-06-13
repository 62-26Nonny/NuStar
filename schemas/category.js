const mongoose = require('mongoose');

const reqString = {
    type: String, 
    require: true
};

const reqFile = {
    type:Buffer,
    require: true
}

const categorySchema = mongoose.Schema({
    name: reqString,
    image: reqFile
});

module.exports = mongoose.model('categories', categorySchema);