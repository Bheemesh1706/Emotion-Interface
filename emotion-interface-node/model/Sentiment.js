const mongoose = require("mongoose");

const schemaSentiment = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Happy: {
        type: String,
        require: true
    },
    Neutral: {
        type: String,
        require: true
    },
    Sad: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("Sentiment", schemaSentiment);