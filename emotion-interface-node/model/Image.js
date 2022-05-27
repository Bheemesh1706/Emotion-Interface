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
    Surprise: { type : Number, required: true },
    Neutral: { type : Number, required: true },
    ImageURL: { type:String, require:true} 
},
{
    timestamps: true,  
}
);

module.exports = mongoose.model("Image", schemaImage);