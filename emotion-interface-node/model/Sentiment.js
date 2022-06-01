const mongoose = require("mongoose");

const schemaSentiment = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Happy: {
        type: Number,
        require: true
    },
    Neutral: {
        type: Number,
        require: true
    },
    Sad: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model("Sentiment", schemaSentiment);