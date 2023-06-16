const {model , Schema} = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    src : {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

const Movie = model('Movie', movieSchema);
