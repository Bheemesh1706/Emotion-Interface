const mongoose = require("mongoose");

const schemaText = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Topic1: {
        type: String,
        require: true
    },
    Topic2: {
        type: String,
        require: true
    },
    Topic3: {
        type: String,
        require: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Text", schemaText);