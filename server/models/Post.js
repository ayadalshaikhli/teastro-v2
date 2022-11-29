const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    src: {
        type: String,
        unique: true,
 
    },
    title: {
        type: String,
        
    }
});

module.exports = mongoose.model('posts', PostSchema)