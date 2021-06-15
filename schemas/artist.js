const mongoose = require('mongoose');

const reqString = {
    type: String, 
    require: true
};

const reqFile = {
    type:Buffer,
    require: true
}

const artistSchema = mongoose.Schema({
    name: reqString,
    image: reqFile,
    followCount: {
        type:Number,
        default: 0
    }
});

module.exports = mongoose.model('artists', artistSchema);