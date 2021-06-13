const mongoose = require('mongoose');

const reqString = {
    type: String, 
    require: true
};

const reqFile = {
    type:Buffer,
    require: true
}

const albumSchema = mongoose.Schema({
    name: reqString,
    cover: reqFile
});

module.exports = mongoose.model('albums', albumSchema);