const mongoose = require("mongoose");

const schemaSentiment = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Happy: { type : Number, required: true },
    Neutral: { type : Number, required: true },
    Sad: { type : Number, required: true },

},
{
    timestamps: true,  
}
);

module.exports = mongoose.model("Sentiment", schemaSentiment);