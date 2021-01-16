const mongoose = require('mongoose');
const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        minlength: 1
    },
    etymologies: [String],
    definitions: [
        {
            category: {
                type: String
            },
            meaning: {
                type: String
            },
            examples: [String]
        }
    ]
});

module.exports = mongoose.model('Word',wordSchema);