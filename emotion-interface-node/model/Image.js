const mongoose = require("mongoose");

const schemaImage = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Angry: { type : Number, required: true },
    Disgust: { type : Number, required: true },
    Fear: { type : Number, required: true },
    Happy: { type : Number, required: true },
    Sad: { type : Number, required: true },
    Suprise: { type : Number, required: true },
    Neutral: { type : Number, required: true }
    
});

module.exports = mongoose.model("Image", schemaImage);